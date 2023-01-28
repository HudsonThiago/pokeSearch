import React from "react";
import "./style/style.css";
import CardImage from "../../img/card.svg";
import { Link } from "react-router-dom";
import { upperCaseFirstLetter, convertNumber } from "../../../services/utils";

export default function Card({ index, id, name, number, image, types }) {
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
                className="card"
                onMouseOver={onMouseOverCard}
                onMouseOut={onMouseOutCard}
                key={`mobile-${index}`}
            >
                <div className="cardTypes">
                    {types.map((t, i) => {
                        const type = t.type.name;
                        return (
                            <div key={"type-" + i} className="imgBox">
                                <img
                                    src={require(`../../img/types/${type}.png`)}
                                    alt={type}
                                    draggable="false"
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="cardMain">
                    <p>Nº {convertNumber(number)}</p>
                    <img
                        className="cardImage"
                        src={CardImage}
                        alt="card"
                        draggable="false"
                    />
                    <img
                        id={"pokemon-" + index}
                        className="pokemonImage"
                        src={image}
                        alt="pokemon"
                        draggable="false"
                    />
                </div>
                <div className="cardTitle">
                    <p>{upperCaseFirstLetter(name)}</p>
                </div>
            </div>
        </Link>
    );
}
