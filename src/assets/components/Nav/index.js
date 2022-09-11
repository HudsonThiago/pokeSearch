import React from "react";
import './style/style.css'

export default function Nav(){
    return (
        <nav>
            <div className="poly1"></div>
            <div className="poly2"></div>
            <div className="poly3"></div>
            <div>
                <button type="button">Pokemons</button>
                <button type="button">Items</button>
                <button type="button">Berries</button>
                <button type="button">Team maker</button>
            </div>
        </nav>
    )
}