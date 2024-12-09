import axios from 'axios';

export async function WeaknessesHandler(types) {
  try {
    const typeData = await Promise.all(
      types.map((type) =>
        axios.get(`https://pokeapi.co/api/v2/type/${type.type.name}`)
      )
    );

    const damageRelations = typeData.map((res) => res.data.damage_relations);

    //"Set" é uma estrutura de dados que armazena valoers únicos
    //Por exemplo, tipos que tem fraquezas em comum
    const weaknesses = new Set();
    const resistances = new Set();
    const immunities = new Set();

    //Preenche os "Sets" com as fraquezas, resistencias e imunidades
    damageRelations.forEach((relations) => {
      relations.double_damage_from.forEach((type) => weaknesses.add(type.name));
      relations.half_damage_from.forEach((type) => resistances.add(type.name));
      relations.no_damage_from.forEach((type) => immunities.add(type.name));
    });

    //Remove do Set "weaknesses" as resistências e imunidades
    resistances.forEach((type) => weaknesses.delete(type));
    immunities.forEach((type) => weaknesses.delete(type));

    //Converte o Set "weaknesses" para um array
    return Array.from(weaknesses);
  } catch (error) {
    console.error('Error fetching type weaknesses:', error);
    return [];
  }
}
