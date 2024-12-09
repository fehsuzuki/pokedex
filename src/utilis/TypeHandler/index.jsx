import ColorTypeHandler from '../ColorTypeHandler';

function capitalizeType(type) {
  return type.toUpperCase();
}

export default function TypeHandler(types) {
  if (types[1]) {
    return (
      <>
        <button className={ColorTypeHandler(types[0].type.name)}>
          {capitalizeType(types[0].type.name)}
        </button>
        <button className={ColorTypeHandler(types[1].type.name)}>
          {capitalizeType(types[1].type.name)}
        </button>
      </>
    );
  }

  return (
    <>
      <button className={ColorTypeHandler(types[0].type.name)}>
        {capitalizeType(types[0].type.name)}
      </button>
    </>
  );
}
