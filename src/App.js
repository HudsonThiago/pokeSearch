import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Pokemons from './pages/Pokemons'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Pokemons />} />
      </Routes>
    </Router>
  );
}
