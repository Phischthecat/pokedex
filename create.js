function createIdFormat(id) {
  return id.toString().padStart(3, '0');
}

function createPokemonTypesHTML(i, j, type, typeByLanguage) {
  return /*html*/ `
    <div id="pokemonType${i}-${j}" class="type typeStyling">
    <img src="./img/icons/${type}.svg" />
      <span class="typeSpan">${typeByLanguage.name}</span>
      </div>
    `;
}

function createPokedexHeader(i) {
  return /*html*/ ` 
  <div class="pokedexMenu">
              <ul>
                <li class="menu left" id="about" onclick="renderPokedexAbout(${i})">${languagePack['about']}</li>
                <li class="menu middle" id="stats" onclick="renderPokedexStats(${i})">${languagePack['stats']}</li>
                <li class="menu right" id="evolution" onclick="renderPokedexEvolution(${i})">${languagePack['evolution']}</li>
              </ul>
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

function createPokedexAbout(description, genera, height, weight, ability1) {
  let height_calc = height * 2.54;
  let height_inch = height_calc.toFixed(2).replace('.', "'");
  let weight_calc = weight * 2.2046;
  let weight_lbs = weight_calc.toFixed(1);
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
          <td>1. ${ability1.name} <br><span id="ab2"></span> </td>
        </tr>
        <tr>
          <td><strong>${languagePack['weaknesses']}</strong></td>
          <td id="weakness"></td>
        </tr>
      </tbody>   
    </table>
    `;
}

function createWeaknesses() {
  for (let m = 0; m < typeDamage.length; m++) {
    getElement('weakness').innerHTML += /*html*/ `
      <img class="typeIcon weaknessIcons" id="weakness-${typeDamage[m]}" src="./img/icons/${typeDamage[m]}.svg" alt="${typeDamage[m]}">
      `;
    changeWeaknessesBackgroundOnType(typeDamage, m);
  }
}

function createPokedexStats(stats) {
  return /*html*/ `
  <table class="blueTable">
        <thead>
          <tr>
            <th colspan="3" id="tableHeadline">Base stats</th>
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

function createTypeDefContainer(pokemonName) {
  return /*html*/ `
  <h4 id="headlineTypeDef">${languagePack['typeDefense']}</h4>
  <span>${languagePack['typeDefDescription']} ${pokemonName.name}</span>
  <div id="typeDefense"></div>
  `;
}

function createTypeDefs(j, type) {
  return /*html*/ `
  <div  class="typeDefContainer">
    <img class="typeIcon" id="${type}${j}" src="./img/icons/${type}.svg" alt="${type}">
    <div class="typeDef"><span id="${type}">1</span></div>
  </div>
  `;
}

function createEvolutionHTML(currentPokemon, evoName) {
  return /*html*/ `
  <div class="evoBg" onclick="renderPokedex(${currentPokemon.id - 1})">
  <div class="evoName" id="evoName">
      <span>${evoName.name}</span>
    </div>
    <div class="evoImg" id="evoImg">
      <img             
          src="${currentPokemon.sprites.other.dream_world.front_default}" 
          alt="${currentPokemon.name}">
    </div>
  </div>
  `;
}
function createEvolutionWithoutOnclickHTML(currentPokemon, evoName) {
  return /*html*/ `
  <div class="evoBg">
  <div class="evoName">
      <span>${evoName.name}</span>
    </div>
    <div class="evoImg">
      <img             
          src="${currentPokemon.sprites.other.dream_world.front_default}" 
          alt="${currentPokemon.name}">
    </div>
  </div>
  `;
}

function createEvolutionLevelUp(evolutionLevel) {
  if (!evolutionLevel) {
    return '';
  } else {
    return /*html */ `<div class="levelUpContainer">
    <span class="levelUp">Level ${evolutionLevel}</span>
  </div>
  `;
  }
}

function changeLevelByType(i) {
  let levels = document.querySelectorAll('.levelUp');
  levels.forEach((level) => {
    level.style.color = colours[pokemons[i].types[0].type.name];
  });
}

function changeEvolutionTextShadow(i) {
  let evolutionNames = document.querySelectorAll('.evoName');
  evolutionNames.forEach((evolutionName) => {
    evolutionName.style = `
    text-shadow: 
    -1px -1px 0 ${colours[pokemons[i].types[0].type.name]}, 
    1px -1px 0 ${colours[pokemons[i].types[0].type.name]}, 
    -1px 1px 0 ${colours[pokemons[i].types[0].type.name]}, 
    1px 1px 0 ${colours[pokemons[i].types[0].type.name]}`;
  });
}

function createFirstEvolution() {
  let currentPokemon = pokemons.find((n) => {
    return n.name === currentEvolution[0].chain.species.name;
  });
  let evoName = getPokemonNameByLanguage(currentPokemon.id - 1);
  getElement('firstEvo').innerHTML = createEvolutionHTML(
    currentPokemon,
    evoName
  );
}

function createSecondEvolution() {
  let currentPokemon = pokemons.find((n) => {
    return n.name === currentEvolution[0].chain.evolves_to[0].species.name;
  });
  let evoName = getPokemonNameByLanguage(currentPokemon.id - 1);
  let evolutionLevel =
    currentEvolution[0].chain.evolves_to[0].evolution_details[0].min_level;
  getElement('levelUpContainer1').innerHTML =
    createEvolutionLevelUp(evolutionLevel);
  getElement('secondEvo').innerHTML = createEvolutionHTML(
    currentPokemon,
    evoName
  );
}

function createThirdEvolution() {
  let currentPokemon = pokemons.find((n) => {
    return (
      n.name ===
      currentEvolution[0].chain.evolves_to[0]?.evolves_to[0].species.name
    );
  });
  let evoName = getPokemonNameByLanguage(currentPokemon.id - 1);
  let evolutionLevel =
    currentEvolution[0].chain.evolves_to[0].evolves_to[0].evolution_details[0]
      .min_level;
  getElement('levelUpContainer2').innerHTML =
    createEvolutionLevelUp(evolutionLevel);
  getElement('thirdEvo').innerHTML = createEvolutionHTML(
    currentPokemon,
    evoName
  );
}

async function createEvolutionPichu() {
  await loadPichu();
  let currentPokemon = pichu.find((n) => {
    return n.name === currentEvolution[0].chain.species.name;
  });
  let currentPokemonSpecies = pichuSpecies.find((n) => {
    return n.name === currentEvolution[0].chain.species.name;
  });
  let evoName = currentPokemonSpecies.names.find(
    (n) => n.language.name == language
  );
  getElement('firstEvo').innerHTML = createEvolutionWithoutOnclickHTML(
    currentPokemon,
    evoName
  );
}
