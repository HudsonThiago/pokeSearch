import React from 'react'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import Pokemons from './pages/Pokemons'
import PokemonProfile from './pages/PokemonProfile'

export default function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<Pokemons />} />
          <Route path='/pokemon/:pokemonId' element={<PokemonProfile/>} />
        </Routes>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
