import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Pokemons from "./pages/Pokemons";
import PokemonProfile from "./pages/PokemonProfile";
import TeamMaker from "./pages/TeamMaker";
import Nomes from "./pages/Nomes";
import "./assets/coreStyle/core.css";
import { Provider } from "react-redux";
import { store } from "./assets/store/index";

export default function App() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Pokemons />} />
                        <Route
                            path="/pokemon/:pokemonId"
                            element={<PokemonProfile />}
                        />
                        <Route path="/team-maker" element={<TeamMaker />} />
                        <Route path="/nomes" element={<Nomes />} />
                    </Routes>
                </Router>
            </Provider>
        </React.StrictMode>
    );
}
