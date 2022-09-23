import React from 'react';
import './style/style.css';
import PokeballImage from '../../img/pokeball.svg';

export default function NavButton({title}){
    return (
        <button className="navButton" type="button">
            <div className="titleDiv">
                <p>{title}</p>
            </div>
            <div className="imgDiv">
                <img src={PokeballImage} alt="pokeball"/>
            </div>
        </button>
    )
}