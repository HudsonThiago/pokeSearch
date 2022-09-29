import React, {useState, useEffect} from 'react';
import { getPokemonSpecieById, getPokemonById } from '../../services/pokemon/pokemonService';
import Card2Img from '../../assets/img/card2.svg';
import PokeballImg from '../../assets/img/pokeball.svg';
import WeightImg from '../../assets/img/icons/weight.svg';
import HeightImg from '../../assets/img/icons/height.svg';
import VariantBox from '../../assets/components/variantBox';
import { Link, useParams } from 'react-router-dom';
import './style/style.css';
import ItemBody from '../../assets/components/ItemBody';
import TypeBox from '../../assets/components/TypeBox';
import AbilityBox from '../../assets/components/AbilityBox';
import WeaknessBox from '../../assets/components/WeaknessBox';
import StatBox from '../../assets/components/StatBox';
import {
    upperCaseFirstLetter,
    removeSpecialCharacters,
    convertUnit,
    convertName,
    convertNumber,
    setLocalStorage,
} from '../../services/utils';

export default function PokemonProfile(){
    
    const [pokemon, setPokemon] = useState(null);
    const [specie, setSpecie] = useState(null);
    const [pokemonDefault, setPokemonDefault] = useState(null);
    const [prevPokemonName, setPrevPokemonName] = useState(null);
    const [nextPokemonName, setNextPokemonName] = useState(null);
    const [pokemonImage, setPokemonImage] = useState("");
    const {pokemonId} = useParams();

    const getPokemon = async ()=> {
        try {
            const response = await getPokemonById(pokemonId);
            
            if (response.status === 200) {
                setPokemon(response.data);
                setPokemonImage(response.data.sprites.other['official-artwork'].front_default);
                if(response.data.is_default === true){
                    localStorage.setItem("name",response.data.name)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getSpecie = async () => {
        try {
            const response = await getPokemonSpecieById(localStorage.getItem("name"));
            if (response.status === 200) {
                setSpecie(response.data);
            }
        } catch (error) {

        }
    }

    const getPokemonDefault = async () => {
        try {
            const pokemonDefaultResponse = specie.varieties.find((v)=>v.is_default === true)
            localStorage.setItem("name",pokemonDefaultResponse.pokemon.name)

            const response = await getPokemonSpecieById(pokemonDefaultResponse.pokemon.name);

            if (response.status === 200) {
                setPokemonDefault(response.data);
            }
        } catch (error) {

        }
    }

    const getPrevPokemon = async () => {
        if(Number(pokemonDefault.id) > 1){
            try {
                const response = await getPokemonSpecieById((pokemonDefault.id)-1);
    
                if (response.status === 200) {
                    setPrevPokemonName(response.data.name);
                }
            } catch (error) {
    
            }
        }
    }

    const getNextPokemon = async () => {
        if(Number(pokemonDefault.id) < 905){
            try {
                const response = await getPokemonSpecieById((pokemonDefault.id)+1);
    
                if (response.status === 200) {
                    setNextPokemonName(response.data.name);
                }
            } catch (error) {
    
            }
        }
    }

    useEffect(() => {
        getPokemon(pokemonId);
    }, [pokemonId]);

    useEffect(() => {
        if(pokemon !== null){
            getSpecie();
        }
    }, [pokemon]);

    useEffect(() => {
        if(specie !== null){
            getPokemonDefault();
        }
    }, [specie]);

    useEffect(() => {
        if(pokemonDefault !== null){
            getPrevPokemon();
            getNextPokemon();
        }
    }, [pokemonDefault]);


    return (
        <>  
            {pokemon !== null &&
            specie !== null &&
            pokemonDefault !== null &&
            prevPokemonName !== null &&
            nextPokemonName !== null && (
                <>
                    <div className='titleContainer'>
                        <div className='titleBox'>
                            <img src={PokeballImg} alt='pokeball' draggable="false"/>
                            <h1>Pokemons</h1>
                        </div>
                        <div className='turnBackBox'>
                            <Link to="/"><p>Voltar</p></Link>
                        </div>
                    </div>
                    <div className='pokemonProfile'>
                        <div className='c1'>
                            <div className='littleNavBox'>
                                <Link to={`/${prevPokemonName}`}><div className='prevBox'><p>{convertNumber(Number(pokemonDefault.id)-1)}</p></div></Link>
                                <div className='centerBox'><p>{convertNumber(pokemonDefault.id)}</p></div>
                                <Link to={`/${nextPokemonName}`}><div className='nextBox'><p>{convertNumber(Number(pokemonDefault.id)+1)}</p></div></Link>
                            </div>
                            <div className='pokemonBox'>
                                <img className="pokemonImage" src={pokemonImage} alt="pokemon" draggable="false"/>
                                <img className="pokemonCard" src={Card2Img} alt="pokemonCard" draggable="false"/>
                            </div>
                            <VariantBox pokemon={pokemon} specie={specie}/>
                        </div>
                        <div className='c2'>
                            <h2>{convertName(pokemon.name, true)}</h2>
                            <p>{removeSpecialCharacters(specie.flavor_text_entries[0].flavor_text)}</p>
                            <ItemBody title="Type">
                                <div className='grid3Columns'>
                                    {pokemon.types.map((t, index)=>{
                                        return <TypeBox key={`type-${index}`} type={t.type}/>
                                    })}
                                </div>
                            </ItemBody>
                            <ItemBody title="Abilities">
                                {pokemon.abilities.map((a, index)=>{
                                    return <AbilityBox key={`ability-${index}`} index={index} ability={a.ability} />
                                })}
                            </ItemBody>
                            <div className='grid2Columns'>
                                <ItemBody title="Weight">
                                    <div className="measurementBox">
                                        <img src={WeightImg} draggable="false"/>
                                        <h3>{convertUnit(pokemon.weight)} Kg</h3>
                                    </div>
                                </ItemBody>
                                <ItemBody title="Height">
                                    <div className="measurementBox">
                                        <img src={HeightImg} draggable="false"/>
                                        <h3>{convertUnit(pokemon.height)} m</h3>
                                    </div>
                                </ItemBody>
                            </div>
                            <ItemBody title="Weakness">
                                <WeaknessBox pokemon={pokemon}/>
                            </ItemBody>
                            <ItemBody title="Base Stats">
                                {pokemon.stats.map((s, index)=>(
                                    <StatBox key={`stat-${index}`} stat={s}/>
                                ))}
                            </ItemBody>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}