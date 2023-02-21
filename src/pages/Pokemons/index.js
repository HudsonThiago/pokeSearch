import React, { useState, useEffect } from "react";
import Body from "../../assets/components/Body";
import Card from "../../assets/components/Card";
import CardMobile from "../../assets/components/CardMobile";
import Header from "../../assets/components/Header";
import { getPokemonsByInterval } from "../../services/pokemon/pokemonService";
import "./style/style.css";
import { pokemonPerRequest, convertName } from "../../services/utils";
import Button from "../../assets/components/Button";
import Pokeball from "../../assets/img/pokeball.svg";

let a = true;

export default function Pokemons() {
    const [pokemons, setPokemons] = useState([]);
    const [initialAmout, setInitialAmout] = useState(1);
    const [finalAmout, setFinalAmout] = useState(pokemonPerRequest);
    const [loadControl, setLoadControl] = useState(true);

    const getPokemons = async (empty = null) => {
        setLoadControl(true);
        let pokemonList = pokemons;
        let initial = initialAmout;
        let final = finalAmout;

        if (empty === true) {
            pokemonList = [];
            initial = 0;
            final = pokemonPerRequest - 1;
        }

        let interval = await getPokemonsByInterval(initial, final);
        interval.forEach((p) => {
            pokemonList.push(p);
        });

        setInitialAmout(initial + pokemonPerRequest);
        setFinalAmout(final + pokemonPerRequest);
        setLoadControl(false);
        setPokemons(pokemonList);
    };

    useEffect(() => {
        (async () => {
            let pokemonList = await getPokemonsByInterval(
                initialAmout,
                finalAmout
            );
            setInitialAmout(initialAmout + pokemonPerRequest);
            setFinalAmout(finalAmout + pokemonPerRequest);
            setPokemons(pokemonList);
            setLoadControl(false);
        })();
    }, []);

    const allPokemonListDesktop = () => {
        return pokemons.map((p, index) => {
            const image = p.sprites.other["official-artwork"].front_default;
            return (
                <Card
                    key={"desktop-" + p.id}
                    id={p.id}
                    index={index}
                    name={convertName(p.species.name, true)}
                    url={p.name}
                    image={image}
                    types={p.types}
                />
            );
        });
    };

    const allPokemonListMobile = () => {
        return pokemons.map((p, index) => {
            const image = p.sprites.other["official-artwork"].front_default;
            return (
                <CardMobile
                    key={"mobile-" + p.id}
                    id={p.id}
                    index={index}
                    name={convertName(p.species.name)}
                    url={p.name}
                    image={image}
                    types={p.types}
                />
            );
        });
    };

    return (
        <Body getPokemons={getPokemons}>
            <Header title="Pokemons" />
            {pokemons && (
                <>
                    <div id="mainContent" className="pokemonsContent">
                        <div className="gradient"></div>
                        <div
                            id="mainFrameDesktop"
                            className="mainFrameDesktopContainer"
                        >
                            <div className="mainFrameDesktop">
                                {allPokemonListDesktop()}
                            </div>
                            <div className="showMeMoreContainer">
                                {loadControl ? (
                                    <div className="loadingContainer">
                                        <p>Loading...</p>
                                        <img
                                            className="loadingPokeball"
                                            src={Pokeball}
                                            alt="LoadingPokebal"
                                        />
                                    </div>
                                ) : (
                                    <Button onClick={getPokemons}>
                                        Show me more
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div
                            id="mainFrameMobile"
                            className="mainFrameMobileContainer"
                        >
                            <div className="mainFrameMobile">
                                {allPokemonListMobile()}
                            </div>
                            <div className="showMeMoreContainer">
                                {loadControl ? (
                                    <div className="loadingContainer">
                                        <p>Loading...</p>
                                        <img
                                            className="loadingPokeball"
                                            src={Pokeball}
                                            alt="LoadingPokebal"
                                        />
                                    </div>
                                ) : (
                                    <Button onClick={getPokemons}>
                                        Show me more
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Body>
    );
}
