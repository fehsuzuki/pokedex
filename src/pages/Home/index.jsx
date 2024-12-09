import SearchBar from '../../components/SearchBar';
import PokemonCard from '../../components/PokemonCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { capitalizeFirstLetter } from '../../utilis/CapitalizeFirstLetter/';
import PaginationControls from '../../components/PaginationControls';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false); // Para indicar carregamento
  const LIMIT = 20; // Número de Pokémon por página

  useEffect(() => {
    loadPokemons(currentPage); // Carregar a primeira página
  }, [currentPage]);

  const loadPokemons = async (page) => {
    setLoading(true);
    try {
      const offset = page * LIMIT;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${LIMIT}`
      );

      // Obtem informações detalhadas para cada Pokémon da página atual
      const pokemonDetails = await Promise.all(
        response.data.results.map((pokemon) => axios.get(pokemon.url))
      );

      setPokemons(pokemonDetails.map((res) => res.data));
    } catch (error) {
      console.error('Error loading Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  //Pesquisa do pokemon
  const pokemonFiltered = async (pokemonName) => {
    if (!pokemonName) {
      setPokemons([]); // Limpa os resultados
      await loadPokemons(0); // Recarrega a primeira página
      return;
    }
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );
    setPokemons([response.data]); // Exibe apenas o resultado encontrado
  };

  return (
    <div>
      <SearchBar pokemonFilter={pokemonFiltered} />
      <PaginationControls
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className={styles.pokemonList}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          pokemons.map((pokemon, index) => (
            <PokemonCard
              id={pokemon.id}
              name={capitalizeFirstLetter(pokemon.name)}
              image={pokemon.sprites.other['official-artwork'].front_default}
              types={pokemon.types}
              key={index}
            />
          ))
        )}
      </div>
      <PaginationControls
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
