export default function PokemonDescription({ pokemonSpecies }) {
  return (
    <div>
      {pokemonSpecies.flavor_text_entries
        ?.find((entry) => entry.language.name === 'en')
        ?.flavor_text.replace(/\u000c/, ' ')}
    </div>
  );
}
