import React, {useState, useEffect} from 'react'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import Pokemons from './pages/Pokemons'
import PokemonProfile from './pages/PokemonProfile'
import TeamMaker from './pages/TeamMaker'
import "./coreStyle/core.css";
import { getPokemonById } from './services/pokemon/pokemonService';
import Nav from './assets/components/Nav';
import Body from './assets/components/Body';

export default function App() {
  
  const [pokemons, setPokemons] = useState([]);

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

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<Pokemons pokemonList={pokemons} />} />
          <Route path='/pokemon/:pokemonId' element={<PokemonProfile pokemonList={pokemons}/>} />
          <Route path='/team-maker' element={<TeamMaker pokemonList={pokemons}/>} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}
