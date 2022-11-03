import { getTypes } from "./pokemon/pokemonService";
import { allPokemons } from "./data";

export const upperCaseFirstLetter = (string) => {
  const upperString = string[0].toUpperCase() + string.substr(1);
  return upperString;
};

export const removeSpecialCharacters = (string) => {
  if (string.includes("\n")) string.replace("\n", "");
  if (string.includes("\f")) string.replace("\f", "");
  return string;
};

export const convertUnit = (string) => {
  let convertString = string.toString();
  let returnString = convertString;
  let stringLength = convertString.length;

  if (stringLength === 1) {
    returnString = "0." + convertString;
  } else {
    let sliceString = convertString.slice(0, -1);
    returnString = sliceString + "." + convertString[stringLength - 1];
  }

  return returnString;
};

export const convertName = (string, split = false) => {
  let splitString = string.split("-");
  let stringTotal = "";

  if (split === true) {
    if (splitString.length >= 2) {
      let aux = splitString[0];
      splitString[0] = splitString[1];
      splitString[1] = aux;
    }
  }

  splitString.forEach((e) => {
    if (e === "gmax") {
      e = "gigantamax";
    }
    if (e === "alola") {
      e = "alolan";
    }
    if (e === "galar") {
      e = "galarian";
    }
    stringTotal += upperCaseFirstLetter(e) + " ";
  });

  return stringTotal;
};

export const convertNumber = (number) => {
  if (number < 10) return "00" + number;
  else if (number >= 10 && number < 100) return "0" + number;
  else return number;
};

export const openModal = (id) => {
  const modal = document.getElementById(`modal-${id}`);
  modal.classList.add("openModal");
};

export const closeModal = (id) => {
  const modal = document.getElementById(`modal-${id}`);
  modal.classList.remove("openModal");
};

export const asyncGetAllTypes = async () => {
  try {
    const response = await getTypes();
    const types = response.data.results;
    const typeList = types.filter(
      (t) => t.name !== "unknown" && t.name !== "shadow"
    );
    let sortTypeList = typeList.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    return sortTypeList;
  } catch (error) {
    console.log(error);
  }
};

export const findPokemonByGroup = (group) => {
  let filteredPokemons = allPokemons.filter((p) => {
    let isGMax = false;

    p.varieties.forEach((v) => {
      if (v.pokemon.name.includes(group)) {
        isGMax = true;
      }
    });

    if (isGMax === true) {
      return true;
    } else {
      return false;
    }
  });
  return filteredPokemons;
};

export const findBabyPokemon = () => {
  let filteredPokemons = allPokemons.filter((p) => p.is_baby === true);
  return filteredPokemons;
};

export const selectPokemonGroup = () => {
  let filteredPokemons = [];

  switch (localStorage.getItem("group")) {
    case "gigantamaxGroup":
      filteredPokemons = findPokemonByGroup("-gmax");
      break;
    case "megaEvolutionGroup":
      filteredPokemons = findPokemonByGroup("-mega");
      break;
    case "alolanGroup":
      filteredPokemons = findPokemonByGroup("-alola");
      break;
    case "galarianGroup":
      filteredPokemons = findPokemonByGroup("-galar");
      break;
    case "hisuianGroup":
      filteredPokemons = findPokemonByGroup("-hisui");
      break;
    case "babiesGroup":
      filteredPokemons = findBabyPokemon();
      break;
    default:
      filteredPokemons = [];
  }

  return filteredPokemons;
};
