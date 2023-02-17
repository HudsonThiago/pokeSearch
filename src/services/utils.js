import { getTypes } from "./pokemon/pokemonService";
import { allPokemons } from "./data";

export const pokemonPerRequest = 15;

export const minPokemonCount = 0;

export const maxPokemonCount = 1008;

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

export const convertName = (string, split = true) => {
    let splitString = string.split("-");
    let stringTotal = "";

    splitString.forEach((name) => {
        if (name === "gmax") {
            //GIGANTAMAX
            let aux = splitString[0];
            splitString[0] = "gigantamax";
            splitString[1] = aux;
        } else if (name === "mega") {
            //MEGA
            let aux = splitString[0];
            splitString[0] = "mega";
            splitString[1] = aux;
        } else if (name === "alola") {
            //ALOLAN
            let aux = splitString[0];
            splitString[0] = "alolan";
            splitString[1] = aux;
        } else if (name === "galar") {
            //GALARIAN
            let aux = splitString[0];
            splitString[0] = "galarian";
            splitString[1] = aux;
        } else if (name === "hisui") {
            //HISUIAN
            let aux = splitString[0];
            splitString[0] = "hisuian";
            splitString[1] = aux;
        } else if (name === "aria") {
            //ARIA MELOETTA
            let aux = splitString[0];
            splitString[0] = "Aria";
            splitString[1] = aux;
        } else if (name === "pirouette") {
            //PIROUETTE MELOETTA
            let aux = splitString[0];
            splitString[0] = "Pirouette";
            splitString[1] = aux;
        }
    });

    splitString.forEach((name) => {
        stringTotal += upperCaseFirstLetter(name) + " ";
    });

    return stringTotal;
};

export const getTypeColor = (type) => {
    let color;

    switch (type.name) {
        case "bug":
            color = "83C300";
            break;
        case "dark":
            color = "5B5466";
            break;
        case "dragon":
            color = "006FC9";
            break;
        case "electric":
            color = "FBD100";
            break;
        case "fairy":
            color = "FB89EB";
            break;
        case "fighting":
            color = "E0306A";
            break;
        case "fire":
            color = "FF9741";
            break;
        case "flying":
            color = "89AAE3";
            break;
        case "ghost":
            color = "4C6AB2";
            break;
        case "grass":
            color = "38BF4B";
            break;
        case "ground":
            color = "E87236";
            break;
        case "ice":
            color = "4CD1C0";
            break;
        case "normal":
            color = "919AA2";
            break;
        case "poison":
            color = "B567CE";
            break;
        case "psychic":
            color = "FF6675";
            break;
        case "rock":
            color = "C8B686";
            break;
        case "steel":
            color = "5A8EA2";
            break;
        case "water":
            color = "3692DC";
            break;
        default:
            color = "324e67";
    }
    return color;
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
