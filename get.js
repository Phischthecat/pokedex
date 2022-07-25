function getElement(id) {
  return document.getElementById(id);
}

function getPokemonNameByLanguage(i) {
  return pokemonSpecies[i].names.find((n) => n.language.name == language);
}

function getStatsNameByLanguage(i) {
  return pokemonStats[i].names.find((n) => n.language.name == language);
}

function getTypeNameByLanguage(i, j) {
  for (let k = 0; k < typesOfPokemon.length; k++) {
    if (pokemons[i].types[j].type.name === typesOfPokemon[k].name) {
      return typesOfPokemon[k].names.find((n) => n.language.name == language);
    }
  }
}

function getDescriptionByLanguage(i) {
  if (language == 'de') {
    return pokemonSpecies[i].flavor_text_entries.find(
      (n) => n.language.name == language && n.version.name == 'omega-ruby'
    );
  } else if (language == 'en') {
    return pokemonSpecies[i].flavor_text_entries.find(
      (n) => n.language.name == language && n.version.name == 'ruby'
    );
  }
}

function getGeneraByLanguage(i) {
  return pokemonSpecies[i].genera.find((n) => n.language.name == language);
}

function getAbility1ByLanguage() {
  return currentAbilities[0].names.find((n) => n.language.name == language);
}

function getAbility2ByLanguage() {
  if (!currentAbilities[1]) {
    return '';
  } else {
    return currentAbilities[1].names.find((n) => n.language.name == language);
  }
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

async function getCurrentAbilities(i) {
  for (let j = 0; j < pokemons[i].abilities.length; j++) {
    let currentUrl = pokemons[i].abilities[j].ability.url;
    let response = await fetchUrl(currentUrl);
    currentAbilities.push(response);
  }
}

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
