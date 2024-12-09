import styles from './styles.module.css';

export const genderHandler = (genderRate) => {
  if (genderRate == 0) {
    return <i className="fa fa-mars" aria-hidden="true"></i>; //Só male
  } else if (genderRate == 8) {
    return <i className="fa fa-venus" aria-hidden="true"></i>; //Só female
  } else if (genderRate == -1) {
    return 'Unknown';
  } else {
    return (
      <div className={styles.allGenders}>
        <i className="fa fa-mars" aria-hidden="true"></i>
        <i className="fa fa-venus" aria-hidden="true"></i>
      </div>
    );
  }
};
