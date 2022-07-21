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

function checkIfAbility2(ability2) {
  if (!ability2) {
    getElement('ab2').innerHTML = '';
  } else {
    getElement('ab2').innerHTML = /*html*/ `
      ${ability2.name} (${languagePack['hiddenAbility']})
      `;
  }
}
