let pokemons = [];
let pokemonStats = [];
let typesOfPokemon = [];
let typeDef = [];
let typeDamage = [];
let weaknesses = [];
let currentAbilities = [];
let language = 'en';
let languagePack = headlines_english;
let limit = 15; //id

async function loadPokemon() {
  for (let i = 1; i < 19; i++) {
    let url_types = `https://pokeapi.co/api/v2/type/` + i;
    let currentPokemon = await fetchUrl(url_types);
    typesOfPokemon.push(currentPokemon);
  }
  for (let i = 1; i < 7; i++) {
    let url_stats = `https://pokeapi.co/api/v2/stat/` + i;
    let currentPokemon = await fetchUrl(url_stats);
    pokemonStats.push(currentPokemon);
  }
  for (let i = 1; i <= limit; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/` + i;
    let url_species = `https://pokeapi.co/api/v2/pokemon-species/` + i;

    let currentPokemon = await fetchUrl(url);
    let currentPokemonSpecies = await fetchUrl(url_species);
    buildMyPokemonArray(currentPokemon, currentPokemonSpecies); //in helpers.js
  }
  console.log(pokemons, pokemonStats, typesOfPokemon);
  renderPokemonCard();
  renderPokedex(0);
}

function getPokemonNameByLanguage(i) {
  return pokemons[i].names.find((n) => n.language.name == language);
}

function changePokemonNameByLanguage(i, id) {
  let changedName = '';
  for (let j = 0; j < pokemons[i][id].length; j++) {
    if (pokemons[i][id][j].language.name == language) {
      changedName = pokemons[i][id][j].name;
    }
  }
  return changedName;
}

function renderPokemonCard() {
  let pokemon_container = getElement('pokemonContainer');
  pokemon_container.innerHTML = '';
  for (let i = 0; i < pokemons.length; i++) {
    let pokemon = pokemons[i];
    let pokemonName = getPokemonNameByLanguage(i);
    let pokemonId = createIdFormat(pokemon.id); //in helpers.js
    let pokemonImg = pokemon.spritePokemanCard;
    pokemon_container.innerHTML += generatePokemonCard(
      i,
      pokemonId,
      pokemonName,
      pokemonImg
    );
    pokemonTypes(i);
  }
}

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

function renderPokedex(i) {
  slideOutPokemonInfo();
  getElement('loader').classList.remove('hide');
  setTimeout(function () {
    generatePokedexHeader(i);
    renderPokedexAbout(i);
    slideInPokemonInfo();
    setTimeout(function () {
      getElement('loader').classList.add('hide');
    }, 200);
  }, 1000);
}

function generatePokedexHeader(i) {
  const pokemon = pokemons[i];
  let pokemonId = createIdFormat(pokemon.id); //in helpers.js
  let pokemonName = getPokemonNameByLanguage(i); //in helpers.js
  getElement('headline').innerHTML = pokemonName.name;
  getElement('pokemonName').innerHTML = pokemonName.name;
  getElement('pokemonImg').src = pokemon.spritePokedex;
  getElement('pokemonId').innerHTML = `#${pokemonId}`;
  pokedexTypes(i);
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

async function renderPokedexAbout(i) {
  let infoContainer = getElement('infoContainer');
  infoContainer.innerHTML = '';
  infoContainer.innerHTML = /*html*/ `
  <div id="aboutWrapper">
    <div id="aboutContainer"></div>
  </div>
  `;
  aboutActive();
  currentAbilities = [];
  await getCurrentAbilities(i);
  generatePokedexAbout(i);
  changeColorByTypeInAbout(i);
}
// typesOfPokemon[i].name === typeDef[j].double_from[k].name && typesOfPokemon[i].name !== typeDef[j].half_from[l].name

function getWeaknesses() {
  typeDamage = [];
  for (let i = 0; i < typesOfPokemon.length; i++) {
    for (let j = 0; j < typeDef.length; j++) {
      for (let k = 0; k < typeDef[j].double_from.length; k++) {
        if (
          typesOfPokemon[i].name === typeDef[j].double_from[k].name &&
          !typeDamage.includes(typeDef[j].double_from[k].name)
        ) {
          typeDamage.push(typeDef[j].double_from[k].name);
        }
      }
      for (let l = 0; l < typeDef[j].half_from.length; l++) {
        if (typeDamage.includes(typeDef[j].half_from[l].name)) {
          let index = typeDamage.indexOf(typeDef[j].half_from[l].name);
          typeDamage.splice(index, 1);
        }
      }
      for (let m = 0; m < typeDef[j].no_from.length; m++) {
        if (typeDamage.includes(typeDef[j].no_from[m].name)) {
          let index = typeDamage.indexOf(typeDef[j].no_from[m].name);
          typeDamage.splice(index, 1);
        }
      }
    }
  }
  createWeaknesses();
}

function changeWeaknessesBackgroundOnType(typeDamage, m) {
  document.getElementById(`weakness-${typeDamage[m]}`).style.backgroundColor =
    colours[typeDamage[m]];
}

function createWeaknesses() {
  for (let m = 0; m < typeDamage.length; m++) {
    getElement('weakness').innerHTML += /*html*/ `
    <img class="typeIcon weaknessIcons" id="weakness-${typeDamage[m]}" src="./img/icons/${typeDamage[m]}.svg" alt="${typeDamage[m]}">
    `;
    changeWeaknessesBackgroundOnType(typeDamage, m);
  }
}

async function getCurrentAbilities(i) {
  for (let j = 0; j < pokemons[i].abilities.length; j++) {
    let currentUrl = pokemons[i].abilities[j].ability.url;
    let response = await fetchUrl(currentUrl);
    currentAbilities.push(response);
  }
}

function generatePokedexAbout(i) {
  const pokemon = pokemons[i];
  let about = getElement('aboutContainer');
  about.innerHTML = '';
  let description = getDescriptionByLanguage(i);
  let genera = getGeneraByLanguage(i);
  let height = pokemon.height / 10;
  let weight = pokemon.weight / 10;
  let ability1 = getAbility1ByLanguage(); //in helpers.js
  let ability2 = getAbility2ByLanguage(); //in helpers.js
  about.innerHTML = createPokedexAbout(
    i,
    description,
    genera,
    height,
    weight,
    ability1,
    ability2
  );

  getWeaknesses();
}

function createPokedexAbout(
  i,
  description,
  genera,
  height,
  weight,
  ability1,
  ability2
) {
  let height_calc = height * 2.54;
  let height_inch = height_calc.toFixed(2).replace('.', "'");
  let weight_calc = weight * 2.2046;
  let weight_lbs = weight_calc.toFixed(1);
  // changeHeadlinesByLanguage(i);
  if (language === 'de') {
    height_lang = height.toString().replace('.', ',');
    weight_lang = weight.toString().replace('.', ',');
  } else {
    height_lang = height;
    weight_lang = weight;
  }
  return /*html*/ `
  <p id="textCurrentPokemon">${description.flavor_text}</p>
  <table class="pokedexData">
    <thead>
      <tr>
        <th colspan="2" id="pokedexData">${languagePack['pokedexData']}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>${languagePack['species']}</strong></td>
        <td>${genera.genus}</td>
      </tr>
      <tr>
        <td><strong>${languagePack['height']}</strong></td>
        <td>${height_lang} m <span>(${height_inch}")</span></td>
      </tr>
      <tr>
        <td><strong>${languagePack['weight']}</strong></td>
        <td>${weight_lang} kg <span>(${weight_lbs}lbs)</span></td>
      </tr>
      <tr>
        <td><strong>${languagePack['abilities']}</strong></td>
        <td>1. ${ability1.name} <br><span>${ability2.name} (${languagePack['hiddenAbility']})</span> </td>
      </tr>
      <tr>
        <td><strong>${languagePack['weaknesses']}</strong></td>
        <td id="weakness"></td>
      </tr>
    </tbody>   
  </table>
  `;
}

function renderPokedexStats(i) {
  let infoContainer = getElement('infoContainer');
  infoContainer.innerHTML = '';
  infoContainer.innerHTML = /*html*/ `
  <div id="statsWrapper">
    <div id="statsContainer"></div>
    <div id="typeDefenseContainer"></div>
  </div>
  `;
  statsActive(); //in helpers.js
  generatePokedexStats(i);
  generatePokedexTypeDef(i);
  changeColorByTypeInStats(i); //in helpers.js
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

function createPokedexStats(stats) {
  return /*html*/ `
<table class="blueTable">
      <thead>
        <tr>
          <th id="tableHeadline">Base stats</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>${stats[0]}</strong></td>
          <td id="pokedexHp">${stats[1]}</td>
          <td>
            <div
              id="barHp"
              class="bar"
              style="width: calc(${stats[1]}% / 2)"
            ></div>
          </td>
        </tr>
        <tr>
          <td><strong>${stats[2]}</strong></td>
          <td id="pokedexAtk">${stats[3]}</td>
          <td>
            <div
              id="barAtk"
              class="bar"
              style="width: calc(${stats[3]}% / 2)"
            ></div>
          </td>
        </tr>
        <tr>
          <td><strong>${stats[4]}</strong></td>
          <td id="pokedexDef">${stats[5]}</td>
          <td>
            <div
              id="barDef"
              class="bar"
              style="width: calc(${stats[5]}% / 2)"
            ></div>
          </td>
        </tr>
        <tr>
          <td><strong>${stats[6]}</strong></td>
          <td id="pokedexSpAtk">${stats[7]}</td>
          <td>
            <div
              id="barSpAtk"
              class="bar"
              style="width: calc(${stats[7]}% / 2)"
            ></div>
          </td>
        </tr>
        <tr>
          <td><strong>${stats[8]}</strong></td>
          <td id="pokedexSpDef">${stats[9]}</td>
          <td>
            <div
              id="barSpDef"
              class="bar"
              style="width: calc(${stats[9]}% / 2)"
            ></div>
          </td>
        </tr>
        <tr>
          <td><strong>${stats[10]}</strong></td>
          <td id="pokedexSpeed">${stats[11]}</td>
          <td>
            <div
              id="barSpeed"
              class="bar"
              style="width: calc(${stats[11]}% / 2)"
            ></div>
          </td>
        </tr>
      </tbody>
    </table>
`;
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

function getTypeNameByLanguage(i, j) {
  for (let k = 0; k < typesOfPokemon.length; k++) {
    if (pokemons[i].types[j].type.name === typesOfPokemon[k].name) {
      return typesOfPokemon[k].names.find((n) => n.language.name == language);
    }
  }
}

function checkTypeDefForPokedex() {
  for (let i = 0; i < typesOfPokemon.length; i++) {
    let type = typesOfPokemon[i].name;
    let answer;
    let result;
    for (let j = 0; j < typeDef.length; j++) {
      for (let k = 0; k < typeDef[j].double_from.length; k++) {
        if (typesOfPokemon[i].name === typeDef[j].double_from[k].name) {
          getElement(type).innerHTML *= 2;
        }
      }
      for (let l = 0; l < typeDef[j].half_from.length; l++) {
        if (typesOfPokemon[i].name === typeDef[j].half_from[l].name) {
          answer = getElement(type);
          result = answer.innerHTML *= 0.5;
        }
      }
      for (let m = 0; m <= typeDef[j].half_from.length; m++) {
        if (typesOfPokemon[i].name === typeDef[j].no_from[m]?.name) {
          getElement(type).innerHTML = 0;
        }
      }
    }
    addFraction(result, answer);
  }
}

function addFraction(result, answer) {
  if (result === 0.5) {
    answer.innerHTML = '&frac12;';
  } else if (result === 0.25) {
    answer.innerHTML = '&frac14;';
  }
}

function pokemonTypes(i) {
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

function pokedexTypes(i) {
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

function createPokemonTypesHTML(i, j, type, typeByLanguage) {
  return /*html*/ `
  <div id="pokemonType${i}-${j}" class="type typeStyling">
  <img src="./img/icons/${type}.svg" />
    <span>${typeByLanguage.name}</span>
    </div>
  `;
}

function createPokedexTypesHTML(j, type, typeByLanguage) {
  return /*html*/ `
<div id="pokedexType${j}" class="type typeStyling">
<img src="./img/icons/${type}.svg"/>
  <span>${typeByLanguage.name}</span>
  </div>
`;
}

async function loadMorePokemons() {
  for (let i = pokemons.length + 1; i <= limit; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/` + i;
    let url_species = `https://pokeapi.co/api/v2/pokemon-species/` + i;
    currentPokemon = await fetchUrl(url);
    currentPokemonSpecies = await fetchUrl(url_species);
    buildMyPokemonArray(currentPokemon, currentPokemonSpecies);
  }
  renderPokemonCard();
  isLoading = false;
}
