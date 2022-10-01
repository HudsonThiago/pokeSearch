import React, {useState} from 'react';
import Card from '../../assets/components/Card';
import Header from '../../assets/components/Header';
import './style/style.css';

export default function Pokemons({pokemonList}){
    
    const [pokemons, setPokemons] = useState(pokemonList);
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    const allPokemonList = () => {
        return (
            pokemons.map((p, index)=>{
                const image = p.sprites.other['official-artwork'].front_default;
                return <Card id={p.id} index={index} key={p.id} name={p.name} number={p.id} image={image} types={p.types}/>
            })
        )
    }

    const filteredPokemonList = () => {
        return (
            filteredPokemons.map((p, index)=>{
                const image = p.sprites.other['official-artwork'].front_default;
                return <Card id={p.id} index={index} key={p.id} name={p.name} number={p.id} image={image} types={p.types}/>
            })
        )
    }

    return (
        <>
            <Header title="Pokemons"/>
            <div className='mainContent'>
                <div className='mainFrame'>
                {
                    filteredPokemons.length === 0
                    ?allPokemonList()
                    :filteredPokemonList()
                }
                </div>
            </div>
        </>
    )
}