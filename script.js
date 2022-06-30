let currentPokemon;

async function loadPokemon() {
  let response = await fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur');
  currentPokemon = await response.json();
  console.log(currentPokemon);

  renderPokemonInfo();
}

function renderPokemonInfo() {
  document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
  document.getElementById('pokemonImg').src =
    currentPokemon['sprites']['front_default'];
}
