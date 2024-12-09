import styles from './styles.module.css';
import TypeHandler from '../../utilis/TypeHandler';
import ColorTypeHandler from '../../utilis/ColorTypeHandler';

export default function TypesWeaknesses({ pokemonData, pokemonWeaknesses }) {
  return (
    <div className={styles.pokemonTypes}>
      <p>Types</p>
      <div>{TypeHandler(pokemonData.types)}</div>
      <p>Weaknesses</p>
      <div>
        {pokemonWeaknesses.map((weakness) => (
          <button key={weakness} className={ColorTypeHandler(weakness)}>
            {weakness.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
