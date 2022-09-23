import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Pokemons from './pages/Pokemons'
import PokemonProfile from './pages/PokemonProfile'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Pokemons />} />
        <Route path='/pokemon/:pokemonId' element={<PokemonProfile/>} />
      </Routes>
    </Router>
  );
}
