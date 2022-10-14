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
                    <NavButton link="/" title="Pokemons"/>
                    <NavButton wip={true} title="Items"/>
                    <NavButton wip={true} title="Berries"/>
                    <NavButton link="/team-maker" title="Team maker"/>
                </div>
            </div>
        </nav>
    )
}