import React from "react";
import './style/style.css'
import NavButton from "../NavButton";

export default function Nav(){
    return (
        <nav>
            <div className="poly1"></div>
            <div className="poly2"></div>
            <div className="poly3"></div>
            <div className="navContent">
                <div>

                </div>
                <div className="buttonArea">
                    <NavButton title="Pokemons"/>
                    <NavButton title="Items"/>
                    <NavButton title="Berries"/>
                    <NavButton title="Team maker"/>
                </div>
            </div>
        </nav>
    )
}