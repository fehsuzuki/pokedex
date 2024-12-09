import styles from './styles.module.css';
import { capitalizeFirstLetter } from '../../utilis/CapitalizeFirstLetter/';

export default function SubHeader({ pokemonData }) {
  return (
    <div className={styles.subHeader}>
      <h1>{capitalizeFirstLetter(pokemonData.name)}</h1>
      <h2>{`N°${pokemonData.id}`}</h2>
    </div>
  );
}
