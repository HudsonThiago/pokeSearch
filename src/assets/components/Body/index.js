import React, { useEffect } from "react";
import {
    openModal,
    asyncGetAllTypes,
    selectPokemonGroup,
} from "../../../services/utils";
import { allPokemons } from "../../../services/data";
import { getPokemonById } from "../../../services/pokemon/pokemonService";
import Nav from "../Nav";
import Modal from "../Modal";
import Button from "../Button";
import Modal1 from "../Modal/Modal/Modal1";

import "./style/style.css";

export default function Body({ setPokemons, children }) {
    const modalAction = async () => {
        const types = await asyncGetAllTypes();
        let filteredPokemons = selectPokemonGroup();

        types.forEach((type) => {
            const selectedType = localStorage.getItem(type.name) || null;

            if (selectedType) {
                const pokemonsByType = filteredPokemons.filter((p) => {
                    let isType = false;

                    p.types.forEach((t) => {
                        if (t.type.name.includes(type.name)) {
                            isType = true;
                        }
                    });

                    if (isType === true) {
                        return true;
                    } else {
                        return false;
                    }
                });

                const pokemonsNotEqual = pokemonsByType.filter((pokemon) => {
                    if (
                        filteredPokemons.find(
                            (filtered) => filtered.id === pokemon.id
                        )
                    ) {
                        return false;
                    }
                    return true;
                });

                filteredPokemons = filteredPokemons.concat(pokemonsNotEqual);
            }
        });

        let pokemonList = [];

        const getFilteredPokemons = async () => {
            filteredPokemons.forEach(async (p) => {
                try {
                    const response = await getPokemonById(p.id);
                    pokemonList.push(response.data);
                } catch (error) {
                    console.log(error);
                }
            });
        };

        getFilteredPokemons().then(() => {
            setTimeout(() => setPokemons(pokemonList), 2000);
        });
    };

    return (
        <>
            <Nav />
            <Modal
                id={1}
                action={modalAction}
                title="Advanced Search"
                footer={true}
            >
                <Modal1 />
            </Modal>
            <header>
                <div className="headerContainer">
                    <div>
                        Search
                        {/* <SearchBar
                            pokemons={pokemons}
                            pokemonNameField={pokemonNameField}
                            setPokemonNameField={setPokemonNameField}
                            filteredPokemons={filteredPokemons}
                            setFilteredPokemons={setFilteredPokemons}
                        /> */}
                    </div>
                    <Button
                        onClick={() => {
                            openModal(1);
                        }}
                    >
                        Advanced search
                    </Button>
                </div>
            </header>
            <main>
                <section className="bodyContainer">{children}</section>
            </main>
        </>
    );
}
