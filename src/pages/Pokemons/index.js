import React, {useState, useEffect} from 'react';
import getPokemonById from '../../services/pokemon/pokemonService';
import Nav from '../../assets/components/Nav';
import Body from '../../assets/components/Body';
import Card from '../../assets/components/Card';
import PokeballImg from '../../assets/img/pokeball.svg';
import './style/style.css';

export default function Pokemons(){
    
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const getPokemons = async ()=> {
            let pokemonList = [];
            for(let i=1;i<=150;i++){
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

    return (
        <>  
            <Nav/>
            <Body>
                <div className='titleBox'>
                    <img src={PokeballImg} alt='pokeball'/>
                    <h1>Pokemons</h1>
                </div>
                <div className='mainContent'>
                    <div className='whiteFade'></div>
                    <div className='mainFrame'>
                    {pokemons.map((p)=>{
                        const image = p.sprites.other['official-artwork'].front_default;
                        return <Card name={p.name} number={p.id} image={image} types={p.types}/>
                    })}
                    </div>
                </div>
            </Body>
        </>
    )
}