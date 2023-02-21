import api from "../api";
import { allPokemons } from "../data";
import { pokemonPerRequest, maxPokemonCount } from "../utils";
import {
    tryGetPokemonsByInterval,
    searchGeneration,
    searchPokemonGroup,
    searchPokemonName,
    searchPokemonType,
    checkFilter,
} from "./utils";

export async function getPokemonById(id) {
    return await api.get(`pokemon/${id}`);
}

export async function getPokemonsByInterval(initialAmout, finalAmout) {
    const filter = checkFilter();

    let pokemonList = [];

    if (filter) {
        let filteredPokemon = [];
        filteredPokemon = searchGeneration();
        filteredPokemon = searchPokemonGroup(filteredPokemon);
        filteredPokemon = searchPokemonType(filteredPokemon);
        filteredPokemon = searchPokemonName(filteredPokemon);

        if (filteredPokemon.length <= finalAmout) {
            finalAmout = filteredPokemon.length - 1;
        }

        for (let i = initialAmout; i <= finalAmout; i++) {
            await tryGetPokemonsByInterval(filteredPokemon[i].id, pokemonList);
        }
    } else {
        if (maxPokemonCount < finalAmout) {
            finalAmout = maxPokemonCount;
        }

        for (let i = initialAmout; i <= finalAmout; i++) {
            await tryGetPokemonsByInterval(i, pokemonList);
        }
    }
    return pokemonList;
}

export async function getPokemonVarieties(varieties) {
    let pokemonList = [];
    for (let i = 0; i < varieties.length; i++) {
        try {
            let splitUrl = varieties[i].pokemon.url.split("/");
            const response = await getPokemonById(splitUrl.at(-2));
            pokemonList.push(response.data);
        } catch (e) {
            console.log(e);
        }
    }
    return pokemonList;
}

export async function getPokemonSpecieById(id) {
    return await api.get(`pokemon-species/${id}`);
}

export async function getPokemonAbility(id) {
    return await api.get(`ability/${id}`);
}

export async function getTypes() {
    return await api.get(`type/`);
}

export async function getTypeById(id) {
    return await api.get(`type/${id}`);
}
