import React, {useState, useEffect} from 'react';
import {getPokemonById} from '../../services/pokemon/pokemonService';
import Nav from '../../assets/components/Nav';
import Body from '../../assets/components/Body';
import Card from '../../assets/components/Card';
import PokeballImg from '../../assets/img/pokeball.svg';
import './style/style.css';

export default function Pokemons(){
    
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [pokemonNameField, setPokemonNameField] = useState("");

    useEffect(() => {
        const getPokemons = async ()=> {
            let pokemonList = [];
            for(let i=1;i<=151;i++){
                try {
                    const response = await getPokemonById(i);
                    
                    if (response.status === 200) {
                        pokemonList.push(response.data);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            setPokemons(pokemonList);
        }

        getPokemons();
    }, []);

    const allPokemonList = () => {
        return (
            pokemons.map((p, index)=>{
                const image = p.sprites.other['official-artwork'].front_default;
                return <Card index={index} key={p.id} name={p.name} number={p.id} image={image} types={p.types}/>
            })
        )
    }

    const filteredPokemonList = () => {
        return (
            filteredPokemons.map((p, index)=>{
                const image = p.sprites.other['official-artwork'].front_default;
                return <Card index={index} key={p.id} name={p.name} number={p.id} image={image} types={p.types}/>
            })
        )
    }

    return (
        <>  
            <Nav/>
            <Body
                pokemons={pokemons}
                pokemonNameField={pokemonNameField}
                setPokemonNameField={setPokemonNameField}
                filteredPokemons={filteredPokemons}
                setFilteredPokemons={setFilteredPokemons}
            >
                <div className='titleBox'>
                    <img src={PokeballImg} alt='pokeball'/>
                    <h1>Pokemons</h1>
                </div>
                <div className='mainContent'>
                    <div className='mainFrame'>
                    {
                        filteredPokemons.length === 0
                        ?allPokemonList()
                        :filteredPokemonList()
                    }
                    </div>
                </div>
            </Body>
        </>
    )
}