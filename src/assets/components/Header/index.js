import React from "react";
import './style/style.css';
import PokeballImg from '../../img/pokeball2.svg';
import { Link } from "react-router-dom";
import { upperCaseFirstLetter, convertNumber } from "../../../services/utils";

export default function Header({title, route}){

    return (
        <div className='titleContainer'>
            <div className='titleBox'>
                <img src={PokeballImg} alt='pokeball' draggable="false"/>
                <h1>{title}</h1>
            </div>
            {
                route
                ?
                    <div className='turnBackBox'>
                        <Link to={route}><p>Voltar</p></Link>
                    </div>
                :
                    null
            }
        </div>
    )
}