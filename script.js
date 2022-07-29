let pokemons = [];
let pokemonSpecies = [];
let pokemonStats = [];
let typesOfPokemon = [];
let typeDef = [];
let typeDamage = [];
let weaknesses = [];
let currentAbilities = [];
let currentEvolution = [];
let promises_pokemon = [];
let promises_pokemonSpecies = [];
let language = 'en';
let languagePack;
let limit = 30; //first loaded amount

function chooseGerman() {
  getElement('german').style.filter = 'brightness(1)';
  getElement('english').style.filter = 'brightness(0.5)';
  language = 'de';
  restart();
}

function chooseEnglish() {
  getElement('german').style.filter = 'brightness(0.5)';
  getElement('english').style.filter = 'brightness(1)';
  language = 'en';
  restart();
}

function restart() {
  checkChoosenLanguage();
  changeInputPlaceholderByLanguage();
  renderPokemonCard();
  generatePokedexHeader(0);
  renderPokedexAbout(0);
}

async function start() {
  preloaderStart();
  checkChoosenLanguage();
  changeInputPlaceholderByLanguage();
  await loadPokemon();
  renderPokemonCard();
  generatePokedexHeader(0);
  renderPokedexAbout(0);
  await preloaderEnd();
}

function renderPokemonCard() {
  let pokemon_container = getElement('pokemonContainer');
  pokemon_container.innerHTML = '';
  for (let i = 0; i < pokemons.length; i++) {
    const pokemon = pokemons[i];
    let pokemonName = getPokemonNameByLanguage(i); //in get.js
    let pokemonId = createIdFormat(pokemon.id); //in helpers.js
    let pokemonImg = pokemon.sprites.other.dream_world.front_default;
    pokemon_container.innerHTML += generatePokemonCard(
      //in generate.js
      i,
      pokemonId,
      pokemonName,
      pokemonImg
    );
    generatePokemonTypes(i); //in generate.js
  }
  console.log(pokemons);
}

function renderPokedex(i) {
  getElement('pokedexContainer').style.display = 'flex'; //in get.js
  slideOutPokemonInfo(); //in helpers.js
  getElement('loader').classList.remove('hide'); //in get.js
  generatePokedexHeader(i); //in generate.js
  renderPokedexAbout(i);
  setTimeout(function () {
    slideInPokemonInfo(); //in helpers.js
    setTimeout(function () {
      getElement('loader').classList.add('hide');
    }, 200);
  }, 1500);

  if (window.innerWidth < 830) {
    document.documentElement.style.overflow = 'hidden';
  }
}

async function renderPokedexAbout(i) {
  let infoContainer = getElement('infoContainer'); //in get.js
  infoContainer.innerHTML = '';
  infoContainer.innerHTML = createPokedexAboutContainer(); //in create.js
  aboutActive(); //in helpers.js
  currentAbilities = [];
  await getCurrentAbilities(i); //in get.js
  generatePokedexAbout(i); //in generate.js
  changeColorByTypeInAbout(i); //in changeColor.js
}

function renderPokedexStats(i) {
  let infoContainer = getElement('infoContainer'); //in get.js
  infoContainer.innerHTML = '';
  infoContainer.innerHTML = createPokedeStatsContainer(); //in create.js
  statsActive(); //in helpers.js
  generatePokedexStats(i); //in generate.js
  generatePokedexTypeDef(i); //in generate.js
  changeColorByTypeInStats(i); //in helpers.js
}

async function renderPokedexEvolution(i) {
  let infoContainer = getElement('infoContainer'); //in get.js
  infoContainer.innerHTML = '';
  infoContainer.innerHTML = createPokedexEvolutionContainer(); //in create.js
  evolutionActive(); //in helpers.js
  currentEvolution = [];
  await getCurrentEvolutionChain(i); //in get.js
  generatePokedexEvolution(i); //in generate.js
  changeColorByTypeInEvolution(i); //in changeColor.js
}

async function loadPokemon() {
  await loadTypes();
  await loadStats();
  await loadAllPokemonInfos();
}

async function loadTypes() {
  let promises = [];
  for (let i = 1; i < 19; i++) {
    let url_types = `https://pokeapi.co/api/v2/type/` + i;
    promises.push(fetchUrl(url_types)); //in helpers.js
  }
  // resolved all promises simultaneously
  typesOfPokemon = await Promise.all(promises);
}

async function loadStats() {
  let promises = [];
  for (let i = 1; i < 7; i++) {
    let url_stats = `https://pokeapi.co/api/v2/stat/` + i;
    promises.push(fetchUrl(url_stats)); //in helpers.js
  }
  // resolved all promises simultaneously
  pokemonStats = await Promise.all(promises);
}

async function loadAllPokemonInfos() {
  for (let i = 1; i <= limit; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/` + i;
    let url_species = `https://pokeapi.co/api/v2/pokemon-species/` + i;
    promises_pokemon.push(fetchUrl(url)); //in helpers.js
    promises_pokemonSpecies.push(fetchUrl(url_species)); //in helpers.js
  }
  // resolved all promises simultaneously
  pokemons = await Promise.all(promises_pokemon);
  pokemonSpecies = await Promise.all(promises_pokemonSpecies);
}

async function loadMorePokemons() {
  for (let i = pokemons.length + 1; i <= limit; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/` + i;
    let url_species = `https://pokeapi.co/api/v2/pokemon-species/` + i;
    promises_pokemon.push(fetchUrl(url)); //in helpers.js
    promises_pokemonSpecies.push(fetchUrl(url_species)); //in helpers.js
  }
  // resolved all promises simultaneously and pushes the response in the empty array before the equal sign
  pokemons = await Promise.all(promises_pokemon);
  pokemonSpecies = await Promise.all(promises_pokemonSpecies);

  renderPokemonCard();
  isLoading = false;
  hideContainer('pokemonLoader'); //in helpers.js
}

/**
 * Because Pichu has ID 172,
 * it doesn't load at the same time as Pikachu and Raichu.
 * So I had to load Pichu for the evolution section.
 * But without the onclick function.
 */
let pichu;
let pichuSpecies;

async function loadPichu() {
  let promises_pokemon = [];
  let promises_pokemonSpecies = [];
  let url = `https://pokeapi.co/api/v2/pokemon/172`;
  let url_species = `https://pokeapi.co/api/v2/pokemon-species/172`;
  promises_pokemon.push(fetchUrl(url));
  promises_pokemonSpecies.push(fetchUrl(url_species));
  // resolved all promises simultaneously
  pichu = await Promise.all(promises_pokemon);
  pichuSpecies = await Promise.all(promises_pokemonSpecies);
}
