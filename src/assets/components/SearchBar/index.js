import React from 'react';
import './style/style.css';
import PokeballImage from '../../img/pokeball.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({id, placeholder}){

    return (
        <div className="searchBox">
            <form className="fieldDiv">
                <button type="submit" className="searchButton"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                <input id={id} className="textField" type="text" placeholder={placeholder} maxLength="30" />
            </form>
            <div className="imgDiv">
                <img src={PokeballImage} alt="pokeball"/>
            </div>
        </div>
    )
}