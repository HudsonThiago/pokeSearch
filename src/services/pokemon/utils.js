import { getPokemonById } from "./pokemonService";
import { allPokemons } from "../data";

export const tryGetPokemonsByInterval = async (id, pokemonList = [{}]) => {
    try {
        const response = await getPokemonById(id);

        if (response.status === 200) {
            pokemonList.push(response.data);
        }
    } catch (error) {
        console.log(error);
    }
};

export const searchGeneration = (pokemonList = []) => {
    let filteredPokemon = [];

    const generations = [
        [0, 151],
        [151, 251],
        [251, 386],
        [386, 493],
        [493, 649],
        [649, 721],
        [721, 809],
        [809, 890],
        [905, 1008],
    ];

    generations.forEach((generation, index) => {
        if (localStorage.getItem(`generation-${index + 1}`)) {
            if (pokemonList.length === 0) {
                let generationFilteredPokemon = [];
                generationFilteredPokemon = allPokemons.filter(
                    (p) => p.id > generation[0] && p.id <= generation[1]
                );
                generationFilteredPokemon.forEach((pokemon) => {
                    filteredPokemon.push(pokemon);
                });
            } else {
                let generationFilteredPokemon = [];
                generationFilteredPokemon = pokemonList.filter(
                    (p) => p.id > generation[0] && p.id <= generation[1]
                );
                generationFilteredPokemon.forEach((pokemon) => {
                    filteredPokemon.push(pokemon);
                });
            }
        }
    });

    if (filteredPokemon.length !== 0) {
        return filteredPokemon;
    }

    return pokemonList;
};

export const searchPokemonGroup = (pokemonList = []) => {
    let filteredPokemon = pokemonList;
    let group = localStorage.getItem("group");

    if (group) {
        if (pokemonList.length === 0) {
            filteredPokemon = checkGroup(allPokemons, group);
        } else {
            filteredPokemon = checkGroup(pokemonList, group);
        }
        return filteredPokemon;
    }

    return pokemonList;
};

export const searchPokemonName = (pokemonList = []) => {
    let searchName = localStorage.getItem("searchPokemonName");
    let filteredPokemon = [];

    if (searchName) {
        if (pokemonList.length === 0) {
            filteredPokemon = allPokemons.filter((p) =>
                p.name.includes(searchName)
            );
        } else {
            filteredPokemon = pokemonList.filter((p) =>
                p.name.includes(searchName)
            );
        }
        return filteredPokemon;
    }
    return pokemonList;
};

export const searchPokemonType = (pokemonList = []) => {
    let filteredPokemon = [];

    const types = [
        "bug",
        "dark",
        "dragon",
        "electric",
        "fairy",
        "fighting",
        "fire",
        "flying",
        "ghost",
        "grass",
        "ground",
        "ice",
        "normal",
        "poison",
        "psychic",
        "rock",
        "steel",
        "water",
    ];

    types.forEach((type) => {
        if (localStorage.getItem(type)) {
            let typeFilteredPokemon = [];
            typeFilteredPokemon = allPokemons.filter((p) => {
                let isType = false;
                p.types.forEach((t) => {
                    if (t.type.name.includes(type)) {
                        isType = true;
                    }
                });

                if (isType === true) {
                    return true;
                } else {
                    return false;
                }
            });

            typeFilteredPokemon.forEach((pokemon) => {
                if (!filteredPokemon.find((p) => p.id === pokemon.id)) {
                    filteredPokemon.push(pokemon);
                }
            });
        }
    });

    if (filteredPokemon.length !== 0) {
        return filteredPokemon;
    }

    return pokemonList;
};

export const checkFilter = () => {
    const filters = [
        "searchPokemonName",
        "group",
        "generation-1",
        "generation-2",
        "generation-3",
        "generation-4",
        "generation-5",
        "generation-6",
        "generation-7",
        "generation-8",
        "generation-9",
        "bug",
        "dark",
        "dragon",
        "electric",
        "fairy",
        "fighting",
        "fire",
        "flying",
        "ghost",
        "grass",
        "ground",
        "ice",
        "normal",
        "poison",
        "psychic",
        "rock",
        "steel",
        "water",
    ];

    let check = false;

    filters.forEach((filter) => {
        if (localStorage.getItem(filter)) check = true;
    });

    return check;
};

const getGroup = (pokemonList = [], group) => {
    let groupFilteredPokemon = pokemonList.filter((p) => {
        let isVarietie = false;
        p.varieties.forEach((v) => {
            if (v.pokemon.name.includes(group)) {
                isVarietie = true;

                if (group === "-alola" && v.pokemon.name.includes("pikachu")) {
                    isVarietie = false;
                }
            }
        });

        if (isVarietie === true) {
            return true;
        } else {
            return false;
        }
    });

    return groupFilteredPokemon;
};

const getBabiesGroup = (pokemonList) => {
    let groupFilteredPokemon = pokemonList.filter((p) => p.is_baby === true);

    return groupFilteredPokemon;
};

const getLegendaryGroup = (pokemonList) => {
    let groupFilteredPokemon = pokemonList.filter(
        (p) => p.is_legendary === true
    );

    return groupFilteredPokemon;
};

const getMythicalGroup = (pokemonList) => {
    let groupFilteredPokemon = pokemonList.filter(
        (p) => p.is_mythical === true
    );

    return groupFilteredPokemon;
};

const checkGroup = (pokemonList = [], group) => {
    let groupFilteredPokemon = [];

    if (group === "gigantamaxGroup") {
        groupFilteredPokemon = getGroup(pokemonList, "-gmax");
    } else if (group === "megaEvolutionGroup") {
        groupFilteredPokemon = getGroup(pokemonList, "-mega");
    } else if (group === "alolanGroup") {
        groupFilteredPokemon = getGroup(pokemonList, "-alola");
    } else if (group === "galarianGroup") {
        groupFilteredPokemon = getGroup(pokemonList, "-galar");
    } else if (group === "hisuianGroup") {
        groupFilteredPokemon = getGroup(pokemonList, "-hisui");
    } else if (group === "babiesGroup") {
        groupFilteredPokemon = getBabiesGroup(pokemonList);
    } else if (group === "legendaryGroup") {
        groupFilteredPokemon = getLegendaryGroup(pokemonList);
    } else if (group === "mythicalGroup") {
        groupFilteredPokemon = getMythicalGroup(pokemonList);
    }

    return groupFilteredPokemon;
};
