import React, {useState, useEffect} from 'react';
import Body from '../../assets/components/Body';
import './style/style.css';
import { getPokemonSpecieById } from '../../services/pokemon/pokemonService';
import { getPokemonById } from '../../services/pokemon/pokemonService';

export default function Nomes(){

    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const getPokemons = async ()=> {
            let pokemonList = [];
            for(let i=1;i<=905;i++){
                try {
                    const response1 = await getPokemonSpecieById(i);
                    const response2 = await getPokemonById(i)
                    let pokemonSpecies = response1.data;
                    let pokemon = response2.data;
                    let pokemonObject = {};
                    pokemonObject.id = pokemon.id;
                    pokemonObject.name = pokemon.name;
                    pokemonObject.height = pokemon.height;
                    pokemonObject.weight = pokemon.weight;
                    pokemonObject.types = pokemon.types;
                    pokemonObject.is_baby = pokemonSpecies.is_baby;
                    pokemonObject.is_legendary = pokemonSpecies.is_legendary;
                    pokemonObject.is_mythical = pokemonSpecies.is_mythical;
                    pokemonObject.varieties = pokemonSpecies.varieties;

                    pokemonList.push(pokemonObject);
                } catch (error) {
                    console.log(error);
                }
            }

            setPokemons(JSON.stringify(pokemonList));
        }

        getPokemons();
    }, []);

    return (
        <Body>
            {pokemons &&
                <>
                    <div className='mainContent'>
                        <div className='gradient'></div>
                        <div className='mainFrame'>
                            {pokemons}
                        </div>
                    </div>
                </>
            }
        </Body>
    )
}