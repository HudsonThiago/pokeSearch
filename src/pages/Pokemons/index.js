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
import { pokemonListState } from "../../assets/store/reducers/pokemonList";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { allPokemons } from "../../services/data.js";

export default function Pokemons() {
    const dispatch = useDispatch();
    const pokemonListObject = useSelector((list) => list.pokemonList);
    const [pokemons, setPokemons] = useState([]);
    const [loadControl, setLoadControl] = useState(true);
    const [limit, setLimit] = useState(false);

    const getPokemons = async (empty = null) => {
        setLoadControl(true);
        let pokemonList = pokemons;
        let inicialAmout = pokemonListObject.inicialAmout;
        let finalAmout = pokemonListObject.finalAmout;

        if (empty === true) {
            setPokemons([]);
            pokemonList = [];
            inicialAmout = 0;
            finalAmout = pokemonPerRequest;
        }

        let interval = await getPokemonsByInterval(inicialAmout, finalAmout);

        interval.pokemonList.forEach((p) => {
            pokemonList.push(p);
        });

        if (finalAmout + pokemonPerRequest >= interval.length) {
            setLimit(true);
        }

        dispatch(
            pokemonListState({
                length: interval.length,
                inicialAmout: inicialAmout + pokemonPerRequest,
                finalAmout: finalAmout + pokemonPerRequest,
            })
        );

        setPokemons(pokemonList);
        setLoadControl(false);
    };

    useEffect(() => {
        (async () => {
            let interval = await getPokemonsByInterval(1, pokemonPerRequest);

            dispatch(
                pokemonListState({
                    length: allPokemons.length,
                    inicialAmout: 1 + pokemonPerRequest,
                    finalAmout: 2 * pokemonPerRequest,
                })
            );
            setPokemons(interval.pokemonList);
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
                            {!limit && (
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
                                        !limit && (
                                            <Button onClick={getPokemons}>
                                                Show me more
                                            </Button>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                        <div
                            id="mainFrameMobile"
                            className="mainFrameMobileContainer"
                        >
                            <div className="mainFrameMobile">
                                {allPokemonListMobile()}
                            </div>
                            {!limit && (
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
                            )}
                        </div>
                    </div>
                </>
            )}
        </Body>
    );
}
