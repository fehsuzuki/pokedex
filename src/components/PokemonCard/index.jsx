import styles from './styles.module.css';
import TypeHandler from '../../utilis/TypeHandler/index.jsx';
import { useNavigate } from 'react-router-dom';

export default function PokemonCard({ id, name, image, types }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.pokemonCard}
      onClick={() => navigate(`/pokemon/${id}`)}
    >
      <p>{`N°${id}`}</p>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <div className={styles.pokemonTypes}>{TypeHandler(types)}</div>
    </div>
  );
}
