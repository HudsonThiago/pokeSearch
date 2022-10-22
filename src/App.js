import React from 'react'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import Pokemons from './pages/Pokemons'
import PokemonProfile from './pages/PokemonProfile'
import TeamMaker from './pages/TeamMaker'
import "./coreStyle/core.css";

export default function App() {

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<Pokemons/>} />
          <Route path='/pokemon/:pokemonId' element={<PokemonProfile/>} />
          <Route path='/team-maker' element={<TeamMaker/>} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}
