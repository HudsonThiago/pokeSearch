import React from "react";
import './style/style.css';
import { upperCaseFirstLetter } from "../../../services/utils";

export default function TypeBox({type}){
    let color = "4A4F63";
    switch(type.name){
        case "bug":
            color = "83C300";
            break;
        case "dark":
            color = "5B5466";
            break;
        case "bug":
            color = "83C300";
            break;
        case "electric":
            color = "FBD100";
            break;
        case "fairy":
            color = "FB89EB";
            break;
        case "fighting":
            color = "E0306A";
            break;
        case "fire":
            color = "FF9741";
            break;
        case "flying":
            color = "89AAE3";
            break;
        case "ghost":
            color = "4C6AB2";
            break;
        case "grass":
            color = "38BF4B";
            break;
        case "ground":
            color = "E87236";
            break;
        case "ice":
            color = "4CD1C0";
            break;
        case "normal":
            color = "919AA2";
            break;
        case "poison":
            color = "B567CE";
            break;
        case "psychic":
            color = "FF6675";
            break;
        case "rock":
            color = "C8B686";
            break;
        case "steel":
            color = "5A8EA2";
            break;
        case "water":
            color = "3692DC";
            break;
        default:
            color = "3692DC";
    }
    
    return (
        <div className="typeBox" style={{background: `linear-gradient(90deg, #ffffff 0%, #${color}99 100%)`}}>
            <div className="typeBoxGradient">
                <img className="typeImage" src={require(`../../img/types/${type.name}.png`)} alt="{type.name}" draggable="false"/>
                <p>{upperCaseFirstLetter(type.name)}</p>
            </div>
        </div>
    )
}