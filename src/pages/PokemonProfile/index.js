import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Body from "../../assets/components/Body";
import {
    getPokemonSpecieById,
    getPokemonById,
} from "../../services/pokemon/pokemonService";
import WeightImg from "../../assets/img/icons/weight.svg";
import HeightImg from "../../assets/img/icons/height.svg";
import Header from "../../assets/components/Header";
import "./style/style.css";
import ItemBody from "../../assets/components/ItemBody";
import TypeBox from "../../assets/components/TypeBox";
import AbilityBox from "../../assets/components/AbilityBox";
import WeaknessBox from "../../assets/components/WeaknessBox";
import StatBox from "../../assets/components/StatBox";
import Modal from "../../assets/components/Modal";
import {
    removeSpecialCharacters,
    convertUnit,
    convertName,
    convertNumber,
    minPokemonCount,
    maxPokemonCount,
    openModal,
} from "../../services/utils";
import halftone from "../../assets/img/halftone6.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import Modal2 from "../../assets/components/Modal/Modal/Modal2";
import Modal3 from "../../assets/components/Modal/Modal/Modal3";

export default function PokemonProfile() {
    const [pokemon, setPokemon] = useState(null);
    const [specie, setSpecie] = useState(null);
    const [pokemonDescription, setPokemonDescription] = useState(null);
    const [prevPokemonName, setPrevPokemonName] = useState(null);
    const [nextPokemonName, setNextPokemonName] = useState(null);
    const [pokemonImage, setPokemonImage] = useState("");
    const [favorite, setFavorite] = useState(false);
    const [shiny, setShiny] = useState(false);
    let navigate = useNavigate();

    const { pokemonId } = useParams();

    const getPokemon = async (pokemonId) => {
        try {
            const response = await getPokemonById(pokemonId);

            if (response.status === 200) {
                let pokemonDto = response.data;
                setPokemon(pokemonDto);

                await getSpecie(pokemonDto);
                setFavorite(
                    localStorage.getItem(`favorite-${pokemonDto.id}`)
                        ? true
                        : false
                );

                if (
                    pokemonDto.sprites.other["official-artwork"].front_shiny ===
                    null
                ) {
                    pokemonDto.sprites.other["official-artwork"].front_shiny =
                        pokemonDto.sprites.other[
                            "official-artwork"
                        ].front_default;
                }

                setPokemonImage(pokemonDto.sprites.other["official-artwork"]);
                if (pokemonDto.is_default === true) {
                    localStorage.setItem("id", pokemonDto.id);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getSpecie = async (pokemon) => {
        try {
            let pokemonId = pokemon.species.url.split("/");
            const response = await getPokemonSpecieById(pokemonId.at(-2));

            if (response.status === 200) {
                const specie = response.data;
                setSpecie(specie);
                await getPrevPokemon(specie);
                await getNextPokemon(specie);

                let translatedAbilities = {};

                if (specie.flavor_text_entries.length) {
                    translatedAbilities = specie.flavor_text_entries.findLast(
                        (t) => t.language.name === "en"
                    );
                } else {
                    translatedAbilities = {
                        flavor_text: "Unknow data",
                    };
                }

                setPokemonDescription(translatedAbilities.flavor_text);
            }
        } catch (error) {
            console.log("error");
        }
    };

    const getPrevPokemon = async (pokemon) => {
        if (pokemon.id - 1 > 0) {
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
        if (pokemon.id + 1 <= maxPokemonCount) {
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

    const favoritePokemon = () => {
        if (localStorage.getItem(`favorite-${pokemon.id}`)) {
            localStorage.removeItem(`favorite-${pokemon.id}`);
            setFavorite(false);
        } else {
            localStorage.setItem(`favorite-${pokemon.id}`, pokemon.id);
            setFavorite(true);
            openModal(2);
        }
    };

    const pokemonShiny = () => {
        if (shiny == false) {
            setShiny(true);
        } else {
            setShiny(false);
        }
    };

    const keyPress = (e) => {
        if (prevPokemonName && nextPokemonName) {
            if (e.keyCode === 37) {
                //arrow left
                console.log("A");
                navigate(`/pokemon/${prevPokemonName}`);
            } else if (e.keyCode === 39) {
                //arrow right
                console.log("B");
                navigate(`/pokemon/${nextPokemonName}`);
            }
        }
    };

    useEffect(() => {
        getPokemon(pokemonId);
        //document.addEventListener("keydown", keyPress, true);
    }, [pokemonId]);

    const imageAnimation = (e) => {
        if (e.classList.contains("animation")) {
            e.classList.remove("animation");
        }
        setTimeout(() => {
            e.classList.add("animation");
        }, 100);
    };

    return (
        <Body>
            {pokemon && specie && (
                <>
                    <Header title="Pokemons" route="/" />
                    <Modal id={2} title="Pokemon favorito">
                        <Modal2 id={2} pokemonName={pokemon.name} />
                    </Modal>
                    {specie.varieties.length > 1 && (
                        <Modal id={3} title="Variants">
                            <Modal3
                                varieties={specie.varieties}
                                image={pokemonImage.front_default}
                            />
                        </Modal>
                    )}
                    <div className="pokemonProfile">
                        <div className="gradient"></div>
                        <div className="profileInterface">
                            <div className="c1">
                                <div className="pokemonContainer">
                                    <img
                                        className="halftoneShadow"
                                        src={halftone}
                                        draggable="false"
                                    />
                                    <img
                                        className="pokemonImage"
                                        id="pokemonImage"
                                        src={
                                            shiny === false
                                                ? pokemonImage.front_default
                                                : pokemonImage.front_shiny
                                        }
                                        draggable="false"
                                        onLoad={(e) => imageAnimation(e.target)}
                                    />
                                    <p className="pokemonId">
                                        #{convertNumber(specie.id)}
                                    </p>
                                    <div className="additionsContainer">
                                        {specie.varieties.length > 1 ? (
                                            <div
                                                className="additionsBox"
                                                onClick={() => {
                                                    openModal(3);
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                />
                                            </div>
                                        ) : null}
                                        <div
                                            className="additionsBox"
                                            onClick={() => {
                                                favoritePokemon();
                                            }}
                                        >
                                            {favorite ? (
                                                <FontAwesomeIcon
                                                    className="heart"
                                                    icon={solidHeart}
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={regularHeart}
                                                />
                                            )}
                                        </div>
                                        <div
                                            className="additionsBox"
                                            onClick={() => {
                                                pokemonShiny();
                                            }}
                                        >
                                            {shiny ? (
                                                <FontAwesomeIcon
                                                    className="star"
                                                    icon={solidStar}
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={regularStar}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    {specie.id - 1 > minPokemonCount ? (
                                        <Link
                                            to={`/pokemon/${prevPokemonName}`}
                                        >
                                            <div className="changePokemonButton left">
                                                <FontAwesomeIcon
                                                    icon={faArrowLeft}
                                                />
                                            </div>
                                        </Link>
                                    ) : null}
                                    {specie.id + 1 <= maxPokemonCount ? (
                                        <Link
                                            to={`/pokemon/${nextPokemonName}`}
                                        >
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
                                <p>{pokemonDescription}</p>
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
                                            <h3>
                                                {convertUnit(pokemon.height)} m
                                            </h3>
                                        </div>
                                    </ItemBody>
                                </div>
                                <ItemBody title="Weakness">
                                    <WeaknessBox pokemon={pokemon} />
                                </ItemBody>
                                <ItemBody title="Base Stats">
                                    {pokemon.stats.map((stat, index) => (
                                        <StatBox
                                            key={`keyStat-${index}`}
                                            stat={stat}
                                        />
                                    ))}
                                </ItemBody>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Body>
    );
}
