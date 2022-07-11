let currentPokemon;
let pokemons = [];
let limit = 15; //id

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

const bg_colours = {
  normal: '#bfbe9c',
  fire: '#f19955',
  water: '#90aff4',
  electric: '#f9db62',
  grass: '#96d373',
  ice: '#b4e4e2',
  fighting: '#d94a45',
  poison: '#bc4eba',
  ground: '#e8cd87',
  flying: '#c7b5f7',
  psychic: '#F95587',
  bug: '#cbe029',
  rock: '#cbb752',
  ghost: '#8b71ad',
  dragon: '#8b5efd',
  dark: '#8a6b56',
  steel: '#cecede',
  fairy: '#e0a3c2',
};

async function loadPokemon() {
  for (let i = 1; i <= limit; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/` + i;
    let response = await fetch(url);
    currentPokemon = await response.json();
    pokemons.push(currentPokemon);
  }
  renderPokemon();
  renderPokedexHeader(0);
}

function renderPokemon() {
  let pokemon_container = document.getElementById('pokemonContainer');
  pokemon_container.innerHTML = '';
  pokemon_container.innerHTML = /*html*/ `
  
  `;
  for (let i = 0; i < pokemons.length; i++) {
    let pokemon = pokemons[i];
    let pokemonName = firstLetterUppercase(pokemon.name);
    let pokemonId = pokemon.id;
    let pokemonIdAsString = pokemonId.toString().padStart(3, '0');
    let pokemonImg = pokemon.sprites.other.dream_world.front_default;
    pokemon_container.innerHTML += generatePokemonCard(
      i,
      pokemonIdAsString,
      pokemonName,
      pokemonImg
    );

    pokemonTypes(i);
  }
}

function renderPokedexHeader(i) {
  const pokemon = pokemons[i];
  let pokemonId = pokemon.id;
  let pokemonIdAsString = pokemonId.toString().padStart(3, '0');
  let pokemonName = firstLetterUppercase(pokemon.name); //in helpers.js
  document.getElementById('headline').innerHTML = pokemonName;
  document.getElementById('pokemonName').innerHTML = pokemonName;
  document.getElementById('pokemonImg').src =
    pokemon.sprites.other['official-artwork'].front_default;
  document.getElementById('pokemonId').innerHTML = `#${pokemonIdAsString}`;
  pokedexTypes(i);
  changeBackgroundPokedex(i); //in helpers.js
}

function pokemonTypes(i) {
  let typeContainer = document.getElementById(`pokemonTypes${i}`);
  typeContainer.innerHTML = '';
  for (let j = 0; j < pokemons[i].types.length; j++) {
    let type = pokemons[i].types[j].type.name;
    let typeAsString = firstLetterUppercase(type); //in helpers.js

    typeContainer.innerHTML += /*html*/ `
    <div id="pokemonType${i}-${j}" class="type typeStyling">
    <img src="./img/icons/${type}.svg" alt="#" />
      <span>${typeAsString}</span>
      </div>
    `;
    changePokemonBackgroundOnType(i, j, type); //in helpers.js
  }
}

function pokedexTypes(i) {
  let typeContainer = document.getElementById(`types`);
  typeContainer.innerHTML = '';
  for (let j = 0; j < pokemons[i].types.length; j++) {
    let type = pokemons[i].types[j].type.name;
    let typeAsString = firstLetterUppercase(type); //in helpers.js

    typeContainer.innerHTML += /*html*/ `
    <div id="pokedexType${j}" class="type typeStyling">
    <img src="./img/icons/${type}.svg" alt="#" />
      <span>${typeAsString}</span>
      </div>
    `;
    changePokedexBackgroundOnType(j, type); //in helpers.js
  }
}

function generatePokemonCard(i, pokemonIdAsString, pokemonName, pokemonImg) {
  return /*html*/ `
  <div onclick="renderPokedexHeader(${i})" class="pokemonCard" id="pokemonCard${i}">
    <div class="pokemonInfo">
      <div>#${pokemonIdAsString}</div>
      <h3>${pokemonName}</h3>
      <div id="pokemonTypes${i}" class="pokemonTypes"></div>
    </div>
    <div class="pokemonImgWrapper"><img class="pokemonImg" src='${pokemonImg}' alt="">
  <div class="roundShadow"></div>
  </div>
  </div>
  `;
}

async function loadMorePokemons() {
  for (let i = pokemons.length + 1; i <= limit; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/` + i;
    let response = await fetch(url);
    currentPokemon = await response.json();
    pokemons.push(currentPokemon);
  }
  renderPokemon();
  isLoading = false;
}
