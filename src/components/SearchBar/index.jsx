import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

export default function SearchBar({ pokemonFilter, hideSearch }) {
  const navigate = useNavigate();

  return (
    <div className={styles.searchBar}>
      <div id={styles.logo} onClick={() => navigate('/pokedex')}>Pokedéx</div>
      {/* Se a props hideSearch for undefined então mostrar o form */}
      {!hideSearch && (
        <form action="/action_page.php">
          <input
            type="text"
            placeholder="Search..."
            name="search"
            onInput={(e) => pokemonFilter(e.target.value)}
          ></input>
          <i className="fa fa-search"></i>
        </form>
      )}
    </div>
  );
}
