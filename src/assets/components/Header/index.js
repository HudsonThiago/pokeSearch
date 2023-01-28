import React from "react";
import "./style/style.css";
import PokeballImg from "../../img/pokeball2.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Header({ title, route }) {
    return (
        <div className="titleContainer">
            <div className="titleBox">
                <img src={PokeballImg} alt="pokeball" draggable="false" />
                <h1>{title}</h1>
            </div>
            {route ? (
                <Link to={route}>
                    <div className="turnBackBox">
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <p>Back</p>
                    </div>
                </Link>
            ) : null}
        </div>
    );
}
