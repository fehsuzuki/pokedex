import styles from './styles.module.css';
import { capitalizeFirstLetter } from '../../utilis/CapitalizeFirstLetter/';

export default function PokemonStats({ pokemonData }) {
  return (
    <div className={styles.pokemonStats}>
      <p id={styles.pokemonStatsTitle}>Stats</p>
      {pokemonData.stats.map((sta) => {
        if (sta.stat.name !== 'hp') {
          sta.stat.name = capitalizeFirstLetter(sta.stat.name);
        } else {
          sta.stat.name = sta.stat.name.toUpperCase();
        }

        return (
          <div key={sta.stat.name} className={styles.itemStatus}>
            <span className={styles.statName}> {sta.stat.name} </span>
            <progress value={sta.base_stat} max={252} />
            <span className={styles.statValue}> {sta.base_stat} </span>
          </div>
        );
      })}
    </div>
  );
}
