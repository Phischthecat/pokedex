let currentPokemon;
let pokemons = [];
const limit = 1; //id

async function loadPokemon() {
  for (let i = 1; i <= limit; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/` + i;
    let response = await fetch(url);
    currentPokemon = await response.json();
    pokemons.push(currentPokemon);
    console.log(currentPokemon);
  }
  renderPokemonInfo();
}

function renderPokemonInfo() {
  for (let i = 0; i < pokemons.length; i++) {
    const pokemon = pokemons[i];
    let pokemonId = pokemon['id'];
    let pokemonIdAsString = pokemonId.toString().padStart(3, '0');
    let pokemonName =
      pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1);
    document.getElementById('headline').innerHTML = pokemonName;
    document.getElementById('pokemonName').innerHTML = pokemonName;
    document.getElementById('pokemonImg').src =
      pokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById('pokemonId').innerHTML = `#${pokemonIdAsString}`;

    for (let j = 0; j < pokemon['types'].length; j++) {
      const type = pokemon['types'][j]['type']['name'];
      let typeAsString = type.charAt(0).toUpperCase() + type.slice(1);
      let typeContainer = document.getElementById('types');

      typeContainer.innerHTML += /*html*/ `
      <img src="#" alt="#" />
        <span>${typeAsString}</span>
      `;
    }
  }
  //['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; Animierte Bilder
}
