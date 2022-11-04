import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Pokemons from "./pages/Pokemons";
import PokemonProfile from "./pages/PokemonProfile";
import TeamMaker from "./pages/TeamMaker";
import Nomes from "./pages/Nomes";
import "./coreStyle/core.css";

let pokemonList = [];
let amount = { initialAmount: 1, finalAmount: 30 };

export default function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Pokemons pokemonList={pokemonList} amount={amount} />}
          />
          <Route path="/pokemon/:pokemonId" element={<PokemonProfile />} />
          <Route path="/team-maker" element={<TeamMaker />} />
          <Route path="/nomes" element={<Nomes />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}
