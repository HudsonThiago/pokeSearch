import api from "../api";
import { allPokemons } from "../data";
import { pokemonPerRequest } from "../utils";

export async function getPokemonById(id) {
    return await api.get(`pokemon/${id}`);
}

export async function getPokemonsByInterval(initialAmout, finalAmout) {
    const filter = checkFilter();

    let pokemonList = [];

    if (filter) {
        let filteredPokemon = searchGeneration();
        console.log(filteredPokemon);
        initialAmout = 0;
        finalAmout = pokemonPerRequest;

        if (filteredPokemon.length < finalAmout) {
            finalAmout = initialAmout + filteredPokemon.length - 1;
        }

        for (let i = initialAmout; i <= finalAmout; i++) {
            try {
                const response = await getPokemonById(filteredPokemon[i].id);

                if (response.status === 200) {
                    pokemonList.push(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    } else {
        for (let i = initialAmout; i <= finalAmout; i++) {
            try {
                const response = await getPokemonById(i);

                if (response.status === 200) {
                    pokemonList.push(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return pokemonList;
}

const searchPokemonName = () => {
    let searchName = localStorage.getItem("searchPokemonName");
    let filteredPokemon = [];
    if (searchName) {
        filteredPokemon = allPokemons.filter((p) =>
            p.name.includes(searchName)
        );
    }
    return filteredPokemon;
};

const searchGeneration = () => {
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
            let generationFilteredPokemon = [];
            generationFilteredPokemon = allPokemons.filter(
                (p) =>
                    p.id > generations[index][0] &&
                    p.id <= generations[index][1]
            );
            generationFilteredPokemon.forEach((pokemon) => {
                filteredPokemon.push(pokemon);
            });
        }
    });

    return filteredPokemon;
};

const checkFilter = () => {
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
