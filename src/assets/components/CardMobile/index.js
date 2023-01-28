import React from "react";
import "./style/style.css";
import CardImage from "../../img/card.svg";
import { Link } from "react-router-dom";
import {
    upperCaseFirstLetter,
    convertNumber,
    getTypeColor,
} from "../../../services/utils";
import TypeBox from "../TypeBox";
import halftoneImg from "../../img/halftone3.png";

export default function CardMobile({ index, id, name, number, image, types }) {
    const onMouseOverCard = () => {
        const pokemonImage = document.getElementById("pokemon-" + index);
        pokemonImage.style.animation = "pokemonImageAnimation 0.5s";
    };

    const onMouseOutCard = () => {
        const pokemonImage = document.getElementById("pokemon-" + index);
        pokemonImage.style.animation = "none";
    };

    return (
        <Link to={"/pokemon/" + name}>
            <div
                className="cardMobile"
                onMouseOver={onMouseOverCard}
                onMouseOut={onMouseOutCard}
                key={`mobile-${index}`}
                style={{
                    background: `linear-gradient(30deg, #ffffff 40%, #${getTypeColor(
                        types[0].type
                    )}99 100%)`,
                }}
            >
                <div className="pokemonNameBox">
                    <h3>{upperCaseFirstLetter(name)}</h3>
                    <div className="grid2Columns">
                        {types.map((type) => {
                            return (
                                <div className="tinyTypeBox">
                                    <img
                                        className="tinyImg"
                                        src={require(`../../img/types/${type.type.name}.png`)}
                                        alt={type.type.name}
                                        draggable="false"
                                    />
                                    <p>
                                        {upperCaseFirstLetter(type.type.name)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <img className="halfone" src={halftoneImg} draggable="false" />
                <img className="pokemonImg" src={image} draggable="false" />
                <div></div>
            </div>
        </Link>
    );
}
