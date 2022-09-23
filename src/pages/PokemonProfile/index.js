import React, {useState, useEffect} from 'react';
import getPokemonById from '../../services/pokemon/pokemonService';
import Nav from '../../assets/components/Nav';
import Body from '../../assets/components/Body';
import Card2Img from '../../assets/img/card2.svg';
import PokeballImg from '../../assets/img/pokeball.svg';
import { Link, useParams } from 'react-router-dom';
import './style/style.css';

export default function PokemonProfile(){
    
    const [pokemon, setPokemon] = useState([]);
    const [pokemonImage, setPokemonImage] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [pokemonNameField, setPokemonNameField] = useState("");
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
            <Nav/>
            <Body>
                {pokemon && (
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
                            </div>
                        </div>
                    </>
                )}
            </Body>
        </>
    )
}