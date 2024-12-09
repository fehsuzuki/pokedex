import styles from './styles.module.css';

export default function PaginationControls({ currentPage, setCurrentPage }) {
  return (
    <div className={styles.paginationControls}>
      {currentPage > 0 && (
        <button onClick={() => setCurrentPage((prev) => prev - 1)}>
          Previous
        </button>
      )}
      <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
    </div>
  );
}
