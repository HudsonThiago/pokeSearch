import React from 'react';
import './style/style.css';
import PokeballImage from '../../img/pokeball.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({pokemons, pokemonNameField, setPokemonNameField, filteredPokemons, setFilteredPokemons}){

    const handlePokemonNameField = (e) => {
        let value = e.target.value;
        setPokemonNameField(value);
    }

    const handlePokemonFilterButton=(e)=>{
        e.preventDefault();
        const filter = pokemons.filter((p)=>p.species.name.includes(pokemonNameField));
        setFilteredPokemons(filter);
    }

    return (
        <div className="searchBox">
            <form className="fieldDiv" onSubmit={(e)=>{handlePokemonFilterButton(e)}}>
                <button type="submit" className="searchButton"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                <input className="textField" type="text" onChange={(e)=>{handlePokemonNameField(e)}} value={pokemonNameField} placeholder="Search..." />
            </form>
            <div className="imgDiv">
                <img src={PokeballImage} alt="pokeball"/>
            </div>
        </div>
    )
}