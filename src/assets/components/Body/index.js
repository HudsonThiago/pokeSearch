import React from "react";
import SearchBar from "../SearchBar";
import './style/style.css'

export default function Body({pokemons, pokemonNameField, setPokemonNameField, filteredPokemons, setFilteredPokemons, children}){
    return (
        <>
            <header>
                <div className="headerContainer">
                    <div>
                        <SearchBar
                            pokemons={pokemons}
                            pokemonNameField={pokemonNameField}
                            setPokemonNameField={setPokemonNameField}
                            filteredPokemons={filteredPokemons}
                            setFilteredPokemons={setFilteredPokemons}
                        />
                    </div>
                    <div>função B</div>
                </div>
            </header>
            <main>
                <section className="bodyContainer">
                    {children}
                </section>
            </main>
        </>
    )
}