let pokemons = [];
let pokemonSpecies = [];
let pokemonStats = [];
let typesOfPokemon = [];
let typeDef = [];
let typeDamage = [];
let weaknesses = [];
let currentAbilities = [];
let currentEvolution = [];
let language = 'en';
let languagePack;
let limit = 26; //id

function chooseGerman() {
  language = 'de';
  getElement('german').style.filter = 'brightness(1)';
  getElement('english').style.filter = 'brightness(0.5)';
  restart();
}

function chooseEnglish() {
  language = 'en';
  getElement('german').style.filter = 'brightness(0.5)';
  getElement('english').style.filter = 'brightness(1)';
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
    let pokemonName = getPokemonNameByLanguage(i);
    let pokemonId = createIdFormat(pokemon.id); //in helpers.js
    let pokemonImg = pokemon.sprites.other.dream_world.front_default;
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

async function renderPokedexEvolution(i) {
  let infoContainer = getElement('infoContainer');
  infoContainer.innerHTML = '';
  infoContainer.innerHTML = /*html*/ `
  <div id="evolutionWrapper">
    <div id="evolutionContainer">
      <div class="evolution" id="firstEvo"></div>
      <div class="levelUpContainer" id="levelUpContainer1"></div>
      <div class="evolution" id="secondEvo"></div>
      <div class="levelUpContainer" id="levelUpContainer2"></div>
      <div class="evolution" id="thirdEvo"></div>
    </div>
  </div>
  `;
  evolutionActive(); //in helpers.js
  currentEvolution = [];
  await getCurrentEvolutionChain(i);
  generatePokedexEvolution(i);
  changeColorByTypeInEvolution(i);
}

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

async function createEvolutionPichu() {
  await loadPichu();
  let currentPokemon = pichu.find((n) => {
    return n.name === currentEvolution[0].chain.species.name;
  });
  let currentPokemonSpecies = pichuSpecies.find((n) => {
    return n.name === currentEvolution[0].chain.species.name;
  });
  let evoName = currentPokemonSpecies.names.find(
    (n) => n.language.name == language
  );
  getElement('firstEvo').innerHTML = createEvolutionWithoutOnclickHTML(
    currentPokemon,
    evoName
  );
}

async function generatePokedexEvolution(i) {
  if (currentEvolution.length === 1 && currentEvolution[0].id === 10) {
    createEvolutionPichu();
  } else {
    createFirstEvolution();
  }
  if (currentEvolution[0].chain.evolves_to.length === 1) {
    createSecondEvolution();
  } else {
    getElement('levelUpContainer1').classList.add('hide');
  }
  if (currentEvolution[0].chain.evolves_to[0].evolves_to.length === 1) {
    createThirdEvolution();
  } else {
    getElement('levelUpContainer2').classList.add('hide');
  }
}

async function getCurrentEvolutionChain(i) {
  let url_evoChain = pokemonSpecies[i].evolution_chain.url;
  let evoChain = await fetchUrl(url_evoChain);
  currentEvolution.push(evoChain);
}

async function loadPokemon() {
  await loadTypes();
  await loadStats();
  await loadAllPokemonInfos();
  console.log(pokemons, pokemonStats, typesOfPokemon);
}

async function loadTypes() {
  let promises = [];
  for (let i = 1; i < 19; i++) {
    let url_types = `https://pokeapi.co/api/v2/type/` + i;
    promises.push(fetchUrl(url_types));
  }
  // resolved all promises simultaneously
  typesOfPokemon = await Promise.all(promises);
}

async function loadStats() {
  let promises = [];
  for (let i = 1; i < 7; i++) {
    let url_stats = `https://pokeapi.co/api/v2/stat/` + i;
    promises.push(fetchUrl(url_stats));
  }
  // resolved all promises simultaneously
  pokemonStats = await Promise.all(promises);
}

async function loadAllPokemonInfos() {
  let promises_pokemon = [];
  let promises_pokemonSpecies = [];
  for (let i = 1; i <= limit; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/` + i;
    let url_species = `https://pokeapi.co/api/v2/pokemon-species/` + i;
    promises_pokemon.push(fetchUrl(url));
    promises_pokemonSpecies.push(fetchUrl(url_species));
  }
  // resolved all promises simultaneously
  pokemons = await Promise.all(promises_pokemon);
  pokemonSpecies = await Promise.all(promises_pokemonSpecies);
  console.log(pokemons, pokemonSpecies);
}

// async function loadMorePokemons() {
//   let promises_pokemon = [];
//   let promises_pokemonSpecies = [];
//   for (let i = pokemons.length + 1; i <= limit; i++) {
//     let url = `https://pokeapi.co/api/v2/pokemon/` + i;
//     let url_species = `https://pokeapi.co/api/v2/pokemon-species/` + i;
//     promises_pokemon.push(fetchUrl(url));
//     promises_pokemonSpecies.push(fetchUrl(url_species));
//   }
//   for (let j = 0; j < promises_pokemon.length; j++) {
//     // resolved all promises simultaneously and pushes the response in the empty array before the equal sign
//     Promise.all(promises_pokemon).then((values) => {
//       pokemons.push(values[j]);
//     });
//     Promise.all(promises_pokemonSpecies).then((values) => {
//       pokemonSpecies.push(values[j]);
//     });
//     // pokemonSpecies = await Promise.all(promises_pokemonSpecies);
//   }

//   console.log(pokemons, pokemonSpecies);
//   renderPokemonCard();
//   isLoading = false;
//   getElement('pokemonLoader').classList.add('hide');
// }
