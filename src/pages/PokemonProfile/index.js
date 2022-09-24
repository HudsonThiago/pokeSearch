import React, {useState, useEffect} from 'react';
import {getPokemonById} from '../../services/pokemon/pokemonService';
import Card2Img from '../../assets/img/card2.svg';
import PokeballImg from '../../assets/img/pokeball.svg';
import WeightImg from '../../assets/img/icons/weight.svg';
import HeightImg from '../../assets/img/icons/height.svg';
import { Link, useParams } from 'react-router-dom';
import './style/style.css';
import ItemBody from '../../assets/components/ItemBody';
import TypeBox from '../../assets/components/TypeBox';
import AbilityBox from '../../assets/components/AbilityBox';

export default function PokemonProfile(){
    
    const [pokemon, setPokemon] = useState(null);
    const [pokemonImage, setPokemonImage] = useState("");
    const {pokemonId} = useParams();

    useEffect(() => {
        const getPokemons = async ()=> {
            try {
                const response = await getPokemonById(pokemonId);
                
                if (response.status === 200) {
                    setPokemon(response.data);
                    setPokemonImage(response.data.sprites.other['official-artwork'].front_default);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getPokemons();
    }, []);

    return (
        <>  
            {pokemon !== null && (
                <>
                    <div className='titleContainer'>
                        <div className='titleBox'>
                            <img src={PokeballImg} alt='pokeball'/>
                            <h1>Pokemons</h1>
                        </div>
                        <div className='turnBackBox'>
                            <Link to="/"><p>Voltar</p></Link>
                        </div>
                    </div>
                    <div className='pokemonProfile'>
                        <div className='c1'>
                            <div className='pokemonBox'>
                                <img className="pokemonImage" src={pokemonImage} alt="pokemon"/>
                                <img className="pokemonCard" src={Card2Img} alt="pokemonCard"/>
                            </div>
                        </div>
                        <div className='c2'>
                            <h2>{pokemon.name}</h2>
                            <p>It can go for days without eating a single morsel. In the bulb on its back, it stores energy.</p>
                            <ItemBody title="Type">
                                <div className='grid3Columns'>
                                    {pokemon.types.map((t)=>{
                                        return <TypeBox type={t.type}/>
                                    })}
                                </div>
                            </ItemBody>
                            <ItemBody title="Abilities">
                                {pokemon.abilities.map((a, index)=>{
                                    return <AbilityBox index={index} ability={a.ability} />
                                })}
                            </ItemBody>
                            <div className='grid2Columns'>
                                <ItemBody title="Weight">
                                    <div className="measurementBox">
                                        <img src={WeightImg}/>
                                        <h3>{pokemon.weight} Kg</h3>
                                    </div>
                                </ItemBody>
                                <ItemBody title="Height">
                                    <div className="measurementBox">
                                        <img src={HeightImg}/>
                                        <h3>{pokemon.height} m</h3>
                                    </div>
                                </ItemBody>
                            </div>
                            <ItemBody title="Weakness">
                                aaa
                            </ItemBody>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}