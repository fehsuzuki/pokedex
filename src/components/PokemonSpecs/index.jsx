import styles from './styles.module.css';
import { capitalizeFirstLetter } from '../../utilis/CapitalizeFirstLetter/';
import { genderHandler } from '../../utilis/GenderHandler';

export default function PokemonSpecs({
  pokemonData,
  pokemonSpecies,
  showAbilityDescription,
  setShowAbilityDescription,
  pokemonAbility,
}) {
  return (
    <div className={styles.pokemonSpecs}>
      <p>Height</p>
      <p>{`${pokemonData.height / 10} m`}</p>
      <p>Weight</p>
      <p>{`${pokemonData.weight / 10} kg`}</p>
      <p>Gender</p>
      <div>{genderHandler(pokemonSpecies.gender_rate)}</div>
      <p>Category</p>
      <p>
        {pokemonSpecies.genera
          ?.find((genre) => genre.language.name === 'en')
          ?.genus.replace(/\Pokémon/, '')}
      </p>
      <p>Abilities</p>
      <div>
        <div className={styles.abilityInfo}>
          {capitalizeFirstLetter(pokemonData.abilities[0].ability.name)}
          <button
            className={styles.abilityButton}
            onMouseEnter={() => setShowAbilityDescription(true)}
            onMouseLeave={() => setShowAbilityDescription(false)}
          >
            <i className="fa fa-question"></i>
          </button>
          {showAbilityDescription && (
            <div className={styles.abilityDescription}>
              {
                pokemonAbility.flavor_text_entries.find(
                  (effect) => effect.language.name === 'en'
                )?.flavor_text
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
