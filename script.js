let pokemons = [];
let pokemonStats = [];
let typesOfPokemon = [];
let typeDef = [];
let typeDamage = [];
let weaknesses = [];
let currentAbilities = [];
let language = 'en';
let languagePack;
let limit = 30; //id

function checkChoosenLanguage() {
  if (language === 'de') {
    languagePack = headlines_german;
  } else {
    languagePack = headlines_english;
  }
}

async function start() {
  //preloading();
  checkChoosenLanguage();
  changeInputPlaceholderByLanguage();
  await loadPokemon();
  renderPokemonCard();
  generatePokedexHeader(0);
  renderPokedexStats(0);
  //await preloader();
}

async function loadPokemon() {
  await loadTypes();
  await loadStats();
  await loadAllPokemonInfos();
}

async function loadTypes() {
  for (let i = 1; i < 19; i++) {
    let url_types = `https://pokeapi.co/api/v2/type/` + i;
    let currentPokemon = await fetchUrl(url_types);
    typesOfPokemon.push(currentPokemon);
  }
}

async function loadStats() {
  for (let i = 1; i < 7; i++) {
    let url_stats = `https://pokeapi.co/api/v2/stat/` + i;
    let currentPokemon = await fetchUrl(url_stats);
    pokemonStats.push(currentPokemon);
  }
}

async function loadStats() {
  for (let i = 1; i < 7; i++) {
    let url_stats = `https://pokeapi.co/api/v2/stat/` + i;
    let currentPokemon = await fetchUrl(url_stats);
    pokemonStats.push(currentPokemon);
  }
}

async function loadAllPokemonInfos() {
  for (let i = 1; i <= limit; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/` + i;
    let url_species = `https://pokeapi.co/api/v2/pokemon-species/` + i;

    let currentPokemon = await fetchUrl(url);
    let currentPokemonSpecies = await fetchUrl(url_species);
    buildMyPokemonArray(currentPokemon, currentPokemonSpecies); //in helpers.js
  }
}

function renderPokemonCard() {
  let pokemon_container = getElement('pokemonContainer');
  pokemon_container.innerHTML = '';
  for (let i = 0; i < pokemons.length; i++) {
    let pokemon = pokemons[i];
    let pokemonName = getPokemonNameByLanguage(i);
    let pokemonId = createIdFormat(pokemon.id); //in helpers.js
    let pokemonImg = pokemon.spritePokemanCard;
    pokemon_container.innerHTML += generatePokemonCard(
      i,
      pokemonId,
      pokemonName,
      pokemonImg
    );
    generatePokemonTypes(i);
  }
}

function renderPokedex(i) {
  getElement('pokedexContainer').style.display = 'flex';
  slideOutPokemonInfo();
  getElement('loader').classList.remove('hide');
  generatePokedexHeader(i);
  renderPokedexAbout(i);
  setTimeout(function () {
    slideInPokemonInfo();
    setTimeout(function () {
      getElement('loader').classList.add('hide');
    }, 200);
  }, 1500);
}

async function renderPokedexAbout(i) {
  let infoContainer = getElement('infoContainer');
  infoContainer.innerHTML = '';
  infoContainer.innerHTML = /*html*/ `
  <div id="aboutWrapper">
    <div id="aboutContainer"></div>
  </div>
  `;
  aboutActive();
  currentAbilities = [];
  await getCurrentAbilities(i);
  generatePokedexAbout(i);
  changeColorByTypeInAbout(i);
}

function renderPokedexStats(i) {
  let infoContainer = getElement('infoContainer');
  infoContainer.innerHTML = '';
  infoContainer.innerHTML = /*html*/ `
  <div id="statsWrapper">
    <div id="statsContainer"></div>
    <div id="typeDefenseContainer"></div>
  </div>
  `;
  statsActive(); //in helpers.js
  generatePokedexStats(i);
  generatePokedexTypeDef(i);
  changeColorByTypeInStats(i); //in helpers.js
}

async function loadMorePokemons() {
  for (let i = pokemons.length + 1; i <= limit; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/` + i;
    let url_species = `https://pokeapi.co/api/v2/pokemon-species/` + i;
    currentPokemon = await fetchUrl(url);
    currentPokemonSpecies = await fetchUrl(url_species);
    buildMyPokemonArray(currentPokemon, currentPokemonSpecies);
  }
  renderPokemonCard();
  isLoading = false;
  getElement('pokemonLoader').classList.add('hide');
}
