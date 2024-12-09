import SearchBar from '../../components/SearchBar';
import styles from './styles.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { WeaknessesHandler } from '../../utilis/WeaknessesHandler';
import PokemonEvolutions from '../../components/PokemonEvolutions';
import PokemonStats from '../../components/PokemonStats';
import PokemonSpecs from '../../components/PokemonSpecs';
import SubHeader from '../../components/SubHeader';
import PokemonDescription from '../../components/PokemonDescription';
import TypesWeaknesses from '../../components/TypesWeaknesses';
import { useParams } from 'react-router-dom';

export default function PokemonDetails() {
  const { id } = useParams(); // Obtém o ID ou nome do Pokémon da URL
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonAbility, setPokemonAbility] = useState([]);
  const [pokemonSpecies, setPokemonSpecies] = useState([]);
  const [showAbilityDescription, setShowAbilityDescription] = useState(false);
  const [pokemonEvolutions, setPokemonEvolutions] = useState([]);
  const [pokemonWeaknesses, setPokemonWeaknesses] = useState([]);

  //Colocar a página no topo sempre que o parâmetro id mudar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Busca os dados do Pokémon ao carregar o componente
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, [id]);

  // Calcula as fraquezas assim que os dados do Pokémon são carregados
  useEffect(() => {
    if (pokemonData?.types) {
      const fetchWeaknesses = async () => {
        const weaknesses = await WeaknessesHandler(pokemonData.types);
        setPokemonWeaknesses(weaknesses);
      };
      fetchWeaknesses();
    }
  }, [pokemonData]);

  // Busca os detalhes adicionais (habilidades, espécie, evoluções)
  useEffect(() => {
    if (pokemonData) {
      getPokemonDetails();
    }
  }, [pokemonData]);

  const getPokemonDetails = async () => {
    try {
      // Habilidades
      const abilityRes = await axios.get(pokemonData.abilities[0].ability.url);
      setPokemonAbility(abilityRes.data);

      // Espécie
      const speciesRes = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}/`
      );
      setPokemonSpecies(speciesRes.data);

      // Evoluções
      const evolutionChainUrl = speciesRes.data?.evolution_chain?.url;
      if (evolutionChainUrl) {
        const evolutionRes = await axios.get(evolutionChainUrl);
        const evolutionSprites = await fetchEvolutionSprites(
          evolutionRes.data.chain
        );
        setPokemonEvolutions(evolutionSprites);
      }
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    }
  };

  const fetchEvolutionSprites = async (chain) => {
    const evolutionSprites = [];

    // Função recursiva para percorrer a cadeia de evolução
    const traverseChain = async (node) => {
      if (!node) return;

      try {
        // Fazendo chamada ao endpoint do Pokémon para pegar as sprites
        const pokemonRes = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${node.species.name}/`
        );
        evolutionSprites.push({
          id: pokemonRes.data.id,
          sprite:
            pokemonRes.data.sprites.other['official-artwork'].front_default,
          name: pokemonRes.data.name,
          types: pokemonRes.data.types,
        });

        // Recursão para o próximo nível da cadeia
        for (let next of node.evolves_to) {
          await traverseChain(next);
        }
      } catch (error) {
        console.error(`Error fetching sprite for ${node.species.name}:`, error);
      }
    };

    await traverseChain(chain);

    return evolutionSprites;
  };

  if (!pokemonData) {
    return <p>Loading Pokémon details...</p>;
  }

  return (
    <div className={styles.page}>
      <SearchBar hideSearch />
      <div className={styles.pokemonPage}>
        <SubHeader pokemonData={pokemonData} />
        <section className={styles.pokemonInfo}>
          <div className={styles.firstSection}>
            <img
              src={pokemonData.sprites.other['official-artwork'].front_default}
              alt={pokemonData.name}
            />
            <PokemonStats pokemonData={pokemonData} />
          </div>
          <div className={styles.secondSection}>
            <PokemonDescription pokemonSpecies={pokemonSpecies} />
            <PokemonSpecs
              pokemonData={pokemonData}
              pokemonSpecies={pokemonSpecies}
              showAbilityDescription={showAbilityDescription}
              setShowAbilityDescription={setShowAbilityDescription}
              pokemonAbility={pokemonAbility}
            />
            <TypesWeaknesses
              pokemonData={pokemonData}
              pokemonWeaknesses={pokemonWeaknesses}
            />
          </div>
        </section>
      </div>
      <PokemonEvolutions pokemonEvolutions={pokemonEvolutions} />
    </div>
  );
}
