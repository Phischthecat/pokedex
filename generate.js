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
  getElement('pokemonImg').src =
    pokemon.sprites.other['official-artwork'].front_default;
  getElement('pokemonId').innerHTML = `#${pokemonId}`;
  generatePokedexTypes(i);
  changeBackgroundPokedex(i); //in helpers.js
  getElement('pokedexMenu').innerHTML = /*html*/ `
    <div class="pokedexMenu">
                <ul>
                  <li class="menu left" id="about" onclick="renderPokedexAbout(${i})">${languagePack['about']}</li>
                  <li class="menu middle" id="stats" onclick="renderPokedexStats(${i})">${languagePack['stats']}</li>
                  <li class="menu right" id="evolution" onclick="renderPokedexEvolution(${i})">${languagePack['evolution']}</li>
                </ul>
              </div>
    `;
}

function generatePokedexAbout(i) {
  const pokemon = pokemons[i];
  let about = getElement('aboutContainer'); //in helpers.js
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
  typeDefContainer.innerHTML = /*html*/ `
      <h4 id="headlineTypeDef">${languagePack['typeDefense']}</h4>
      <span>${languagePack['typeDefDescription']} ${pokemonName.name}</span>
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

async function generatePokedexEvolution(i) {
  if (currentEvolution.length === 1 && currentEvolution[0].id === 10) {
    createEvolutionPichu();
  } else {
    createFirstEvolution();
  }
  if (currentEvolution[0].chain.evolves_to.length === 1) {
    createSecondEvolution();
  } else {
    hideLevelContainer('levelUpContainer1');
  }
  if (currentEvolution[0].chain.evolves_to[0].evolves_to.length === 1) {
    createThirdEvolution();
  } else {
    hideLevelContainer('levelUpContainer2');
  }
  changeLevelByType(i);
  changeEvolutionTextShadow(i);
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
