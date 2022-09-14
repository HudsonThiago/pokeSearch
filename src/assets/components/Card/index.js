import React from "react";
import './style/style.css';
import CardImage from '../../img/card.svg';
import Bulbasaur from '../../img/001.png';

export default function Card({name, number, image, types}){
    
    const numberConvert=(number)=>{
        if (number < 10) return "00"+number;
        else if (number >= 10 && number < 100) return "0"+number;
        else return number;
    }

    return (
        <div className="card">
            <div className="cardTypes">
                {types.map((t, i)=>{
                    const type = t.type.name;
                    return <div key={"type-"+i} className="imgBox"><img src={require(`../../img/types/${type}.png`)} alt={type}/></div>
                })}
            </div>
            <div className="cardMain">
                <p>Nº {numberConvert(number)}</p>
                <img className="cardImage" src={CardImage} alt="card"/>
                <img className="pokemonImage" src={image} alt="pokemon"/>
            </div>
            <div className="cardTitle">
                <p>{name}</p>
            </div>
        </div>
    )
}