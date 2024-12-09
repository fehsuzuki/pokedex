import styles from './styles.module.css';
import { capitalizeFirstLetter } from '../../utilis/CapitalizeFirstLetter';
import TypeHandler from '../../utilis/TypeHandler';
import { useNavigate } from 'react-router-dom';

export default function PokemonEvolutions({ pokemonEvolutions }) {
  const navigate = useNavigate();

  return (
    <section className={styles.pokemonEvolutions}>
      <p>Evolutions</p>
      <div className={styles.evolutions}>
        {pokemonEvolutions.map((form, index) => (
          <div key={index} className={styles.evolutionItem}>
            <div className={styles.pokemonForm}>
              <div className={styles.pokemonSprites}>
                <img
                  src={form.sprite}
                  alt={form.name}
                  onClick={() => navigate(`/pokemon/${form.id}`)}
                />
              </div>
              <p>{capitalizeFirstLetter(form.name)}</p>
              <div className={styles.pokemonTypes}>
                {TypeHandler(form.types)}
              </div>
            </div>
            {index < pokemonEvolutions.length - 1 && (
              <div className={styles.arrow}>
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
