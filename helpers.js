window.addEventListener('scroll', lazyLoad);
let isLoading = false;
function lazyLoad() {
  let h = document.documentElement;
  let b = document.body;
  let st = 'scrollTop';
  let sh = 'scrollHeight';

  let percent = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;

  if (percent > 70 && !isLoading) {
    isLoading = true;
    limit += 10;
    loadMorePokemons();
  }
}

function changePokemonBackgroundOnType(i, j, type) {
  document.getElementById(`pokemonType${i}-${j}`).style.backgroundColor =
    colours[type];
}

function changePokedexBackgroundOnType(j, type) {
  document.getElementById(`pokedexType${j}`).style.backgroundColor =
    colours[type];
}

function changeBackgroundPokedex(i) {
  let bg_type = pokemons[i].types[0].type.name;
  let bg_color = bg_colours[bg_type];
  document.getElementById('pokedex').style.backgroundColor = bg_color;
  document.getElementById('headline').style.color = bg_color;
}

function firstLetterUppercase(id) {
  return id.charAt(0).toUpperCase() + id.slice(1);
}
