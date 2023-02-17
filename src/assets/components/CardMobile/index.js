import React from "react";
import "./style/style.css";
import CardImage from "../../img/card.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    upperCaseFirstLetter,
    convertNumber,
    getTypeColor,
} from "../../../services/utils";
import TypeBox from "../TypeBox";
import halftoneImg from "../../img/halftone3.png";
import { closeModal } from "../../../services/utils";
export default function CardMobile({
    index,
    id,
    name,
    image,
    types,
    url,
    modal = null,
}) {
    const navigate = useNavigate();

    return (
        <div
            className="cardMobile"
            onClick={() => {
                navigate("/pokemon/" + url);
                if (modal) {
                    closeModal(modal);
                }
            }}
            style={{
                background: `linear-gradient(30deg, #ffffff 40%, #${
                    getTypeColor(types[0].type)
                        ? getTypeColor(types[0].type)
                        : "ffffff"
                }99 100%)`,
            }}
        >
            <div className="pokemonNameBox">
                <h3>{upperCaseFirstLetter(name)}</h3>
                <div className="grid2Columns">
                    {types.map((type, i) => {
                        return (
                            <div
                                key={`mobileType-${id}-${i}`}
                                className="tinyTypeBox"
                            >
                                <img
                                    className="tinyImg"
                                    src={require(`../../img/types/${type.type.name}.png`)}
                                    alt={type.type.name}
                                    draggable="false"
                                />
                                <p>{upperCaseFirstLetter(type.type.name)}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <img className="halfone" src={halftoneImg} draggable="false" />
            <img className="pokemonImg" src={image} draggable="false" />
            <div></div>
        </div>
    );
}
