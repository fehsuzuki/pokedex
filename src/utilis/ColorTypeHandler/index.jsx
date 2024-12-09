import styles from './styles.module.css';

export default function ColorTypeHandler(type) {
  switch (type) {
    case 'bug':
      return styles.typeBug;
    case 'dark':
      return styles.typeDark;
    case 'dragon':
      return styles.typeDragon;
    case 'electric':
      return styles.typeElectric;
    case 'fairy':
      return styles.typeFairy;
    case 'fighting':
      return styles.typeFighting;
    case 'fire':
      return styles.typeFire;
    case 'flying':
      return styles.typeFlying;
    case 'ghost':
      return styles.typeGhost;
    case 'grass':
      return styles.typeGrass;
    case 'ground':
      return styles.typeGround;
    case 'ice':
      return styles.typeIce;
    case 'normal':
      return styles.typeNormal;
    case 'poison':
      return styles.typePoison;
    case 'psychic':
      return styles.typePsychic;
    case 'rock':
      return styles.typeRock;
    case 'steel':
      return styles.typeSteel;
    case 'water':
      return styles.typeWater;
  }
}
