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
  placeholder: 'Nach welchem Pokemon suchst du?',
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
  placeholder: 'What Pokemon are you looking for?',
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

async function fetchUrl(url) {
  let response = await fetch(url);
  return (currentResponse = await response.json());
}

function preloading() {
  getElement('preLoader').style.display = 'flex'; //preloader
  document.body.style.overflow = 'hidden'; //preloader
  toTheTop();
}

async function preloader() {
  setTimeout(function () {
    getElement('preLoader').classList.add('slideToTop');
    document.body.style.overflow = 'scroll';
    setTimeout(function () {
      getElement('preLoader').style.display = 'none';
    }, 1000);
  }, 1.0 * 1000);
}

window.addEventListener('scroll', lazyLoad);
let isLoading = false;
function lazyLoad() {
  getElement('pokemonLoader').classList.remove('hide');
  let h = document.documentElement;
  let b = document.body;
  let st = 'scrollTop';
  let sh = 'scrollHeight';

  let percent = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;

  if (percent > 70 && !isLoading) {
    isLoading = true;
    limit += 15;
    loadMorePokemons();
  }
}

function closePokedex() {
  getElement('pokedexContainer').style.display = 'none';
}

function toTheTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  // blendet den top-up Button aus
  let mybutton = document.getElementById('myBtn');
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    mybutton.classList.remove('hide');
  } else {
    mybutton.classList.add('hide');
  }
}

function changeInputPlaceholderByLanguage() {
  getElement('search').placeholder = languagePack['placeholder'];
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

function addFraction(result, answer) {
  if (result === 0.5) {
    answer.innerHTML = '&frac12;';
  } else if (result === 0.25) {
    answer.innerHTML = '&frac14;';
  }
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
