import React from "react";
import './style/style.css';
import PokeballImg from '../../img/pokeball.svg';

export default function Button({children, onClick}){

    return (
        <button className="genericButton" onClick={onClick}>
            <p>{children}</p>
            <img src={PokeballImg} alt="pokeball" draggable="false" />
        </button>
    )
}