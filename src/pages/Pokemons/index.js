import React, { useState, useEffect } from "react";
import Body from "../../assets/components/Body";
import Card from "../../assets/components/Card";
import CardMobile from "../../assets/components/CardMobile";
import Header from "../../assets/components/Header";
import { getPokemonsByInterval } from "../../services/pokemon/pokemonService";
import "./style/style.css";
import { pokemonPerRequest } from "../../services/utils";

let a = true;

export default function Pokemons({ pokemonList, amount }) {
    const [pokemons, setPokemons] = useState([]);
    const [control, setControl] = useState(true);
    const [initialAmout, setInitialAmout] = useState(amount.initialAmount);
    const [finalAmout, setFinalAmout] = useState(amount.finalAmount);

    const getPokemons = async () => {
        let interval = await getPokemonsByInterval(initialAmout, finalAmout);

        // interval.forEach((p) => {
        //     pokemonList.push(p);
        // });

        setPokemons(interval);
        setControl(true);
    };

    useEffect(() => {
        getPokemons();
    }, []);

    const allPokemonListDesktop = () => {
        return pokemons.map((p, index) => {
            const image = p.sprites.other["official-artwork"].front_default;
            return (
                <Card
                    id={p.id}
                    index={index}
                    name={p.name}
                    number={p.id}
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
                    id={p.id}
                    index={index}
                    name={p.name}
                    number={p.id}
                    image={image}
                    types={p.types}
                />
            );
        });
    };

    return (
        <Body setPokemons={setPokemons} pokemons={pokemons}>
            <Header title="Pokemons" />
            {pokemons && (
                <>
                    <div id="mainContent" className="pokemonsContent">
                        <div className="gradient"></div>
                        <div id="mainFrameDesktop" className="mainFrameDesktop">
                            {allPokemonListDesktop()}
                        </div>
                        <div id="mainFrameMobile" className="mainFrameMobile">
                            {allPokemonListMobile()}
                        </div>
                    </div>
                </>
            )}
        </Body>
    );
}
