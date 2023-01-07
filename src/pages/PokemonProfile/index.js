import React, { useState, useEffect } from "react";
import Body from "../../assets/components/Body";
import {
    getPokemonSpecieById,
    getPokemonById,
} from "../../services/pokemon/pokemonService";
import WeightImg from "../../assets/img/icons/weight.svg";
import HeightImg from "../../assets/img/icons/height.svg";
import Header from "../../assets/components/Header";
import { Link, useParams } from "react-router-dom";
import "./style/style.css";
import ItemBody from "../../assets/components/ItemBody";
import TypeBox from "../../assets/components/TypeBox";
import AbilityBox from "../../assets/components/AbilityBox";
import WeaknessBox from "../../assets/components/WeaknessBox";
import StatBox from "../../assets/components/StatBox";
import {
    removeSpecialCharacters,
    convertUnit,
    convertName,
    convertNumber,
    minPokemonCount,
    maxPokemonCount,
} from "../../services/utils";
import halftone from "../../assets/img/halftone6.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function PokemonProfile() {
    const [pokemon, setPokemon] = useState(null);
    const [specie, setSpecie] = useState(null);
    const [pokemonDescription, setPokemonDescription] = useState(null);
    const [prevPokemonName, setPrevPokemonName] = useState(null);
    const [nextPokemonName, setNextPokemonName] = useState(null);
    const [pokemonImage, setPokemonImage] = useState("");
    const { pokemonId } = useParams();

    const getPokemon = async () => {
        try {
            const response = await getPokemonById(pokemonId);

            if (response.status === 200) {
                setPokemon(response.data);
                getPrevPokemon(response.data);
                getNextPokemon(response.data);
                getSpecie(response.data);
                setPokemonImage(
                    response.data.sprites.other["official-artwork"]
                        .front_default
                );
                if (response.data.is_default === true) {
                    localStorage.setItem("id", response.data.id);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getSpecie = async (pokemon) => {
        try {
            const response = await getPokemonSpecieById(pokemon.id);
            if (response.status === 200) {
                const specie = response.data;
                setSpecie(specie);

                const translatedAbilities = specie.flavor_text_entries.filter(
                    (t) => t.language.name === "en"
                );
                setPokemonDescription(translatedAbilities.at(-1));
            }
        } catch (error) {}
    };

    const getPrevPokemon = async (pokemon) => {
        if (pokemon.id - 1 >= 0) {
            try {
                const response = await getPokemonById(pokemon.id - 1);

                if (response.status === 200) {
                    setPrevPokemonName(response.data.name);
                }
            } catch (error) {
                console.log("error");
            }
        }
    };

    const getNextPokemon = async (pokemon) => {
        if (pokemon.id + 1 <= 905) {
            try {
                const response = await getPokemonById(pokemon.id + 1);

                if (response.status === 200) {
                    setNextPokemonName(response.data.name);
                }
            } catch (error) {
                console.log("error");
            }
        }
    };

    useEffect(() => {
        getPokemon(pokemonId);
    }, [pokemon]);

    return (
        <Body>
            {pokemon !== null && specie !== null && (
                <>
                    <Header title="Pokemons" route="/" />
                    <div className="pokemonProfile">
                        <div className="c1">
                            <div className="pokemonContainer">
                                <img
                                    className="halftoneShadow"
                                    src={halftone}
                                    draggable="false"
                                />
                                <img
                                    className="pokemonImage"
                                    src={pokemonImage}
                                    draggable="false"
                                />
                                {pokemon.id - 1 > minPokemonCount ? (
                                    <Link to={`/pokemon/${prevPokemonName}`}>
                                        <div className="changePokemonButton left">
                                            <FontAwesomeIcon
                                                icon={faArrowLeft}
                                            />
                                        </div>
                                    </Link>
                                ) : null}
                                {pokemon.id + 1 <= maxPokemonCount ? (
                                    <Link to={`/pokemon/${nextPokemonName}`}>
                                        <div className="changePokemonButton right">
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                            />
                                        </div>
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                        <div className="c2">
                            <h2>{convertName(pokemon.name, true)}</h2>
                            <p>
                                {removeSpecialCharacters(
                                    pokemonDescription.flavor_text
                                )}
                            </p>
                            <ItemBody title="Type">
                                <div className="grid3Columns">
                                    {pokemon.types.map((t, index) => {
                                        return (
                                            <TypeBox
                                                key={`type-${index}`}
                                                type={t.type}
                                            />
                                        );
                                    })}
                                </div>
                            </ItemBody>
                            <ItemBody title="Abilities">
                                {pokemon.abilities.map((a, index) => {
                                    return (
                                        <AbilityBox
                                            key={`ability-${index}`}
                                            index={index}
                                            ability={a.ability}
                                        />
                                    );
                                })}
                            </ItemBody>
                            <div className="grid2Columns">
                                <ItemBody title="Weight">
                                    <div className="measurementBox">
                                        <img
                                            src={WeightImg}
                                            draggable="false"
                                        />
                                        <h3>
                                            {convertUnit(pokemon.weight)} Kg
                                        </h3>
                                    </div>
                                </ItemBody>
                                <ItemBody title="Height">
                                    <div className="measurementBox">
                                        <img
                                            src={HeightImg}
                                            draggable="false"
                                        />
                                        <h3>{convertUnit(pokemon.height)} m</h3>
                                    </div>
                                </ItemBody>
                            </div>
                            <ItemBody title="Weakness">
                                <WeaknessBox pokemon={pokemon} />
                            </ItemBody>
                            <ItemBody title="Base Stats">
                                {pokemon.stats.map((s, index) => (
                                    <StatBox key={`stat-${index}`} stat={s} />
                                ))}
                            </ItemBody>
                        </div>
                    </div>
                </>
            )}
        </Body>
    );
}
