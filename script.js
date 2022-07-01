let currentPokemon;
let pokemons = [];
const limit = 3; //id

const colours = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

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
      <div id="type${j}">
      <img src="./img/icons/${typeAsString}.svg" alt="#" />
        <span>${typeAsString}</span>
        </div>
      `;
    }
  }
  //['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; Animierte Bilder
}
