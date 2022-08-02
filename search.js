function filterPokemons() {
  let currentPokemon = [];
  window.scrollTo(0, 0);
  getElement('pokemonContainer').innerHTML = '';
  hideContainer('pokemonLoader');
  let search = getElement('search').value;
  search = search.toLowerCase();
  loadSearch(search, currentPokemon);
}

function loadSearch(search, currentPokemon) {
  if (search.length === 0) {
    renderPokemonCard();
  } else {
    for (let j = 0; j < pokemons.length; j++) {
      if (isNaN(search)) {
        searchForString(j, search, currentPokemon);
      }
    }
    if (!isNaN(search)) {
      searchForNumber(search);
    }
  }
}

function searchForString(j, search, currentPokemon) {
  let searchName = getPokemonNameByLanguage(j);
  if (searchName.name.toLowerCase().includes(search)) {
    currentPokemon = pokemons[j];
    renderPokemonCardOnFilter(j);
  }
}

function searchForNumber(search) {
  let i = search - 1;
  renderPokemonCardOnFilter(i);
  renderPokedex(i);
}
