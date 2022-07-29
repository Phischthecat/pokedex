function filterPokemons() {
  let currentPokemon = [];
  window.scrollTo(0, 0);
  getElement('pokemonContainer').innerHTML = '';
  hideContainer('pokemonLoader');
  let search = getElement('search').value;
  search.toLowerCase();
  loadSearch(search, currentPokemon);
}

function loadSearch(search, currentPokemon) {
  if (search.length === 0) {
    renderPokemonCard();
  } else {
    for (let j = 0; j < pokemons.length; j++) {
      if (isNaN(search)) {
        searchForString(j, search, currentPokemon);
      } else if (pokemons[j].id == search) {
        searchForString(j, search, currentPokemon);
      }
    }
  }
}

function searchForString(j, search, currentPokemon) {
  let searchName = getPokemonNameByLanguage(j);
  if (searchName.name.toLowerCase().includes(search)) {
    currentPokemon = pokemons[j];
    let i = currentPokemon.id - 1;
    renderPokemonCardOnFilter(i);
  }
}

function searchForNumber() {
  let i = search - 1;
  renderPokemonCardOnFilter(i);
  renderPokedex(i);
}
