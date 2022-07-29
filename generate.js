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
  getElement('headline').innerHTML = pokemonName.name; //in get.js
  getElement('pokemonName').innerHTML = pokemonName.name; //in get.js
  getElement('pokemonImg').src =
    pokemon.sprites.other['official-artwork'].front_default; //in get.js
  getElement('pokemonId').innerHTML = `#${pokemonId}`; //in get.js
  generatePokedexTypes(i); //in generate.js
  changeBackgroundPokedex(i); //in changeColor.js
  //in get.js
  getElement('pokedexMenu').innerHTML = createPokedexHeader(i); //in create.js
}

function generatePokedexAbout(i) {
  const pokemon = pokemons[i];
  let about = getElement('aboutContainer'); //in get.js
  let description = getDescriptionByLanguage(i); //in get.js
  let genera = getGeneraByLanguage(i); //in get.js
  let height = pokemon.height / 10;
  let weight = pokemon.weight / 10;
  let ability1 = getAbility1ByLanguage(); //in get.js

  //in create.js
  about.innerHTML = createPokedexAbout(
    description,
    genera,
    height,
    weight,
    ability1
  );
  let ability2 = getAbility2ByLanguage(); //in get.js
  checkIfAbility2(ability2); //in check.js
  getWeaknesses(); //in get.js
}

function generatePokedexStats(i) {
  const pokemon = pokemons[i];
  let stats = [];
  let statsContainer = getElement('statsContainer'); //in get.js
  for (let j = 0; j < pokemon.stats.length; j++) {
    let statsName = getStatsNameByLanguage(j); //in get.js
    let statValue = pokemon.stats[j].base_stat;
    stats.push(statsName.name, statValue);
  }
  statsContainer.innerHTML = createPokedexStats(stats); //in create.js
}

function generatePokedexTypeDef(i) {
  let pokemonName = getPokemonNameByLanguage(i); //in get.js
  let typeDefContainer = getElement('typeDefenseContainer'); //in get.js
  typeDefContainer.innerHTML = createTypeDefContainer(pokemonName); //in create.js
  let typeDef = getElement('typeDefense'); //in get.js
  typeDef.innerHTML = '';
  for (let j = 0; j < typesOfPokemon.length; j++) {
    let type = typesOfPokemon[j].name;
    typeDef.innerHTML += createTypeDefs(j, type); //in create.js
    changeTypeDefBackgroundOnType(j, type); //in changeColor.js
  }
  checkTypeDefForPokedex(); //in check.js
}

async function generatePokedexEvolution(i) {
  if (currentEvolution.length === 1 && currentEvolution[0].id === 10) {
    createEvolutionPichu(); //in create.js
  } else {
    createFirstEvolution(); //in create.js
  }
  if (currentEvolution[0].chain.evolves_to.length >= 1) {
    createSecondEvolution(); //in create.js
  } else {
    hideContainer('levelUpContainer1'); //in helpers.js
  }
  if (currentEvolution[0].chain.evolves_to[0].evolves_to.length >= 1) {
    createThirdEvolution(); //in create.js
  } else {
    hideContainer('levelUpContainer2'); //in helpers.js
  }
  changeLevelByType(i); //in changeColor.js
  changeEvolutionTextShadow(i); //in create.js
}

function generatePokemonTypes(i) {
  let typeContainer = getElement(`pokemonTypes${i}`); //in get.js
  typeContainer.innerHTML = '';
  for (let j = 0; j < pokemons[i].types.length; j++) {
    let type = pokemons[i].types[j].type.name;
    let typeByLanguage = getTypeNameByLanguage(i, j); //in get.js
    //in create.js
    typeContainer.innerHTML += createPokemonTypesHTML(
      i,
      j,
      type,
      typeByLanguage
    );
    changePokemonBackgroundOnType(i, j, type); //in changeColor.js
  }
}

function generatePokedexTypes(i) {
  let typeContainer = document.getElementById(`types`); //in get.js
  typeContainer.innerHTML = '';
  typeDef = [];
  for (let j = 0; j < pokemons[i].types.length; j++) {
    let type = pokemons[i].types[j].type.name;
    let typeByLanguage = getTypeNameByLanguage(i, j); //in get.js
    typeContainer.innerHTML += createPokedexTypesHTML(j, type, typeByLanguage); //in create.js
    changePokedexBackgroundOnType(j, type); //in changeColor.js
    getTypeDefForPokedex(i, j); //in get.js
  }
}
