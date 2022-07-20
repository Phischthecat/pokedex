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

const headlines_german = {
  about: '&Üuml;ber',
  stats: 'Werte',
  evolution: 'Entwicklung',
  pokedexData: 'Pokédex Daten',
  species: 'Spezies',
  height: 'Gr&ouml;&szlig;e',
  weight: 'Gewicht',
  abilities: 'F&auml;higkeiten',
  hiddenAbility: 'versteckte Fähigkeit',
  weaknesses: 'Schw&auml;chen',
  baseStats: 'Basiswerte',
  typeDefense: 'Typ-Verteidigungen',
  typeDefDescription: 'Die Wirksamkeit der einzelnen Typen auf',
};

const headlines_english = {
  about: 'About',
  stats: 'Stats',
  evolution: 'Evolution',
  pokedexData: 'Pokédex Data',
  species: 'Species',
  height: 'Height',
  weight: 'Weight',
  abilities: 'Abilities',
  hiddenAbility: 'hidden ability',
  weaknesses: 'Weaknesses',
  baseStats: 'Base stats',
  typeDefense: 'Type defenses ',
  typeDefDescription: 'The effictiveness of each type on',
};

async function preloader() {
  getElement('preLoader').style.display = 'flex';
  document.body.style.overflow = 'hidden';
  setTimeout(function () {
    getElement('preLoader').classList.add('slideToTop');
    document.body.style.overflow = 'auto';
    setTimeout(function () {
      getElement('preLoader').style.display = 'none';
    }, 1000);
  }, 1.0 * 1000);
}

async function fetchUrl(url) {
  let response = await fetch(url);
  return (currentResponse = await response.json());
}

window.addEventListener('scroll', lazyLoad);
let isLoading = false;
function lazyLoad() {
  let h = document.documentElement;
  let b = document.body;
  let st = 'scrollTop';
  let sh = 'scrollHeight';

  let percent = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;

  if (percent > 30 && !isLoading) {
    isLoading = true;
    limit += 10;
    loadMorePokemons();
  }
}

function buildMyPokemonArray(currentPokemon, currentPokemonSpecies) {
  return pokemons.push({
    id: currentPokemon.id,
    name: currentPokemon.name,
    abilities: currentPokemon.abilities,
    spritePokemanCard: currentPokemon.sprites.other.dream_world.front_default,
    spritePokedex:
      currentPokemon.sprites.other['official-artwork'].front_default,
    weight: currentPokemon.weight,
    height: currentPokemon.height,
    stats: currentPokemon.stats,
    types: currentPokemon.types,
    descriptions: currentPokemonSpecies.flavor_text_entries,
    names: currentPokemonSpecies.names,
    genera: currentPokemonSpecies.genera,
    evolutionChain: currentPokemonSpecies.evolution_chain,
  });
}

function getPokemonNameByLanguage(i) {
  return pokemons[i].names.find((n) => n.language.name == language);
}

function getStatsNameByLanguage(i) {
  return pokemonStats[i].names.find((n) => n.language.name == language);
}

function getTypeNameByLanguage(i, j) {
  for (let k = 0; k < typesOfPokemon.length; k++) {
    if (pokemons[i].types[j].type.name === typesOfPokemon[k].name) {
      return typesOfPokemon[k].names.find((n) => n.language.name == language);
    }
  }
}

function getDescriptionByLanguage(i) {
  if (language == 'de') {
    return pokemons[i].descriptions.find(
      (n) => n.language.name == language && n.version.name == 'omega-ruby'
    );
  } else if (language == 'en') {
    return pokemons[i].descriptions.find(
      (n) => n.language.name == language && n.version.name == 'ruby'
    );
  }
}

function getGeneraByLanguage(i) {
  return pokemons[i].genera.find((n) => n.language.name == language);
}

function getAbility1ByLanguage() {
  return currentAbilities[0].names.find((n) => n.language.name == language);
}

function getAbility2ByLanguage() {
  return currentAbilities[1].names.find((n) => n.language.name == language);
}

function getTypeDefForPokedex(i, j) {
  for (let k = 0; k < typesOfPokemon.length; k++) {
    if (pokemons[i].types[j].type.name === typesOfPokemon[k].name) {
      let damageRelation = typesOfPokemon[k].damage_relations;
      typeDef.push({
        double_from: damageRelation.double_damage_from,
        half_from: damageRelation.half_damage_from,
        no_from: damageRelation.no_damage_from,
      });
    }
  }
}

function getElement(id) {
  return document.getElementById(id);
}

function createIdFormat(id) {
  return id.toString().padStart(3, '0');
}

function changePokemonBackgroundOnType(i, j, type) {
  document.getElementById(`pokemonType${i}-${j}`).style.backgroundColor =
    colours[type];
}

function changePokedexBackgroundOnType(j, type) {
  document.getElementById(`pokedexType${j}`).style.backgroundColor =
    colours[type];
}

function changeTypeDefBackgroundOnType(j, type) {
  document.getElementById(`${type}${j}`).style.backgroundColor = colours[type];
}

function changeBackgroundPokedex(i) {
  let bg_type = pokemons[i].types[0].type.name;
  let bg_color = bg_colours[bg_type];
  document.getElementById('pokedexHeader').style.backgroundColor = bg_color;
  document.getElementById('headline').style.color = bg_color;
}

function changeColorByTypeInStats(i) {
  getElement('stats').style.color = colours[pokemons[i].types[0].type.name];
  getElement('headlineTypeDef').style.color =
    colours[pokemons[i].types[0].type.name];
  getElement(`tableHeadline`).style.color =
    colours[pokemons[i].types[0].type.name];
  const bars = document.querySelectorAll('.bar');
  bars.forEach((bar) => {
    bar.style.backgroundColor = colours[pokemons[i].types[0].type.name];
  });
}
function changeColorByTypeInAbout(i) {
  getElement('about').style.color = colours[pokemons[i].types[0].type.name];
  getElement('pokedexData').style.color =
    colours[pokemons[i].types[0].type.name];
}

function aboutActive() {
  getElement('about').classList.add('active');
  getElement('stats').classList.remove('active');
  getElement('stats').style.color = 'var(--clr-white)';
  getElement('evolution').classList.remove('active');
  getElement('evolution').style.color = 'var(--clr-white)';
}

function statsActive() {
  getElement('about').classList.remove('active');
  getElement('about').style.color = 'var(--clr-white)';
  getElement('stats').classList.add('active');
  getElement('evolution').classList.remove('active');
  getElement('evolution').style.color = 'var(--clr-white)';
}

function evolutionActive() {
  getElement('about').classList.remove('active');
  getElement('about').style.color = 'var(--clr-white)';
  getElement('stats').classList.remove('active');
  getElement('stats').style.color = 'var(--clr-white)';
  getElement('evolution').classList.add('active');
}

function slideOutPokemonInfo() {
  document.getElementById('current-pokemon').classList.remove('slide-in');
  document.getElementById('current-pokemon').classList.add('slide-out');
}

function slideInPokemonInfo() {
  document.getElementById('current-pokemon').classList.add('slide-in');
  document.getElementById('current-pokemon').classList.remove('slide-out');
}
