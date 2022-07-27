function filterPokemons() {
  currentPokemon = [];
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
        searchForString(j);
      } else if (pokemons[j].id == search) {
        searchForNumber();
      }
    }
  }
}

function searchForString(j) {
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
