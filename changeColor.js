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

function changeWeaknessesBackgroundOnType(typeDamage, m) {
  document.getElementById(`weakness-${typeDamage[m]}`).style.backgroundColor =
    colours[typeDamage[m]];
}
