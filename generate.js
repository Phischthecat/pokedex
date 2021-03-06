function generatePokemonCard(i, pokemonId, pokemonName, pokemonImg) {
  return /*html*/ `
    <div onclick="renderPokedex(${i})" class="pokemonCard" id="pokemonCard${i}">
      <div class="pokemonInfo">
        <div>#${pokemonId}</div>
        <h3>${pokemonName.name}</h3>
        <div id="pokemonTypes${i}" class="pokemonTypes"></div>
      </div>
      <div class="pokemonImgWrapper"><img class="pokemonImg" src='${pokemonImg}' alt="">
    <div class="roundShadow"></div>
    </div>
    </div>
    `;
}

function generatePokedexHeader(i) {
  const pokemon = pokemons[i];
  let pokemonId = createIdFormat(pokemon.id); //in helpers.js
  let pokemonName = getPokemonNameByLanguage(i); //in helpers.js
  getElement('headline').innerHTML = pokemonName.name;
  getElement('pokemonName').innerHTML = pokemonName.name;
  getElement('pokemonImg').src = pokemon.spritePokedex;
  getElement('pokemonId').innerHTML = `#${pokemonId}`;
  generatePokedexTypes(i);
  changeBackgroundPokedex(i); //in helpers.js
  getElement('pokedexMenu').innerHTML = /*html*/ `
    <div class="pokedexMenu">
                <ul>
                  <li class="menu left" id="about" onclick="renderPokedexAbout(${i})">About</li>
                  <li class="menu middle" id="stats" onclick="renderPokedexStats(${i})">Stats</li>
                  <li class="menu right" id="evolution">Evolution</li>
                </ul>
              </div>
    `;
}

function generatePokedexAbout(i) {
  const pokemon = pokemons[i];
  let about = getElement('aboutContainer'); //in helpers.js
  about.innerHTML = '';
  let description = getDescriptionByLanguage(i); //in helpers.js
  let genera = getGeneraByLanguage(i); //in helpers.js
  let height = pokemon.height / 10;
  let weight = pokemon.weight / 10;
  let ability1 = getAbility1ByLanguage(); //in helpers.js

  about.innerHTML = createPokedexAbout(
    description,
    genera,
    height,
    weight,
    ability1
  );
  let ability2 = getAbility2ByLanguage(); //in helpers.js
  checkIfAbility2(ability2);
  getWeaknesses();
}

function generatePokedexStats(i) {
  const pokemon = pokemons[i];
  let stats = [];
  let statsContainer = getElement('statsContainer');
  statsContainer.innerHTML = '';
  for (let j = 0; j < pokemon.stats.length; j++) {
    let statsName = getStatsNameByLanguage(j);
    let statValue = pokemon.stats[j].base_stat;
    stats.push(statsName.name, statValue);
  }
  statsContainer.innerHTML = createPokedexStats(stats);
}

function generatePokedexTypeDef(i) {
  let pokemonName = getPokemonNameByLanguage(i);
  let typeDefContainer = getElement('typeDefenseContainer');
  typeDefContainer.innerHTML = '';
  typeDefContainer.innerHTML = /*html*/ `
      <h4 id="headlineTypeDef">Type defenses</h4>
      <span>The effictiveness of each type on ${pokemonName.name}</span>
      <div id="typeDefense"></div>
      `;
  let typeDef = getElement('typeDefense');
  typeDef.innerHTML = '';
  for (let j = 0; j < typesOfPokemon.length; j++) {
    let type = typesOfPokemon[j].name;
    typeDef.innerHTML += /*html*/ `
    <div  class="typeDefContainer">
      <img class="typeIcon" id="${type}${j}" src="./img/icons/${type}.svg" alt="${type}">
      <div class="typeDef"><span id="${type}">1</span></div>
    </div>
    `;
    changeTypeDefBackgroundOnType(j, type);
  }
  checkTypeDefForPokedex();
}

function generatePokemonTypes(i) {
  let typeContainer = getElement(`pokemonTypes${i}`);
  typeContainer.innerHTML = '';

  for (let j = 0; j < pokemons[i].types.length; j++) {
    let type = pokemons[i].types[j].type.name;
    let typeByLanguage = getTypeNameByLanguage(i, j);
    typeContainer.innerHTML += createPokemonTypesHTML(
      i,
      j,
      type,
      typeByLanguage
    );
    changePokemonBackgroundOnType(i, j, type); //in helpers.js
  }
}

function generatePokedexTypes(i) {
  let typeContainer = document.getElementById(`types`);
  typeContainer.innerHTML = '';
  typeDef = [];
  for (let j = 0; j < pokemons[i].types.length; j++) {
    let type = pokemons[i].types[j].type.name;
    let typeByLanguage = getTypeNameByLanguage(i, j);
    typeContainer.innerHTML += createPokedexTypesHTML(j, type, typeByLanguage);
    changePokedexBackgroundOnType(j, type); //in helpers.js
    getTypeDefForPokedex(i, j);
  }
}
