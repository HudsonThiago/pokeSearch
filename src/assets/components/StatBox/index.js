import React, { useState, useEffect } from "react";
import "./style/style.css";
import PokeballImg from "../../img/pokeball.svg";

export default function AbilityBox({ stat }) {
    const [percentage, setPercentage] = useState();
    const [color, setColor] = useState();
    const [name, setName] = useState();

    const getColor = () => {
        switch (stat.stat.name) {
            case "hp":
                setColor("#FF6666");
                setName("HP");
                break;
            case "attack":
                setColor("#FF8B66");
                setName("Attack");
                break;
            case "defense":
                setColor("#FFC266");
                setName("Defense");
                break;
            case "special-attack":
                setColor("#66FFA3");
                setName("Sp. Att");
                break;
            case "special-defense":
                setColor("#66B6FF");
                setName("Sp. Def");
                break;
            case "speed":
                setColor("#FF7BAB");
                setName("Speed");
                break;
            default:
                setColor("#FF6666");
                setName(stat.stat.name);
        }
    };

    useEffect(() => {
        let maxStatValue = 255;
        setPercentage((stat.base_stat * 100) / maxStatValue);
        getColor();
    }, [stat]);

    return (
        <div className="statBox">
            <img src={PokeballImg} alt="pokeball" draggable="false" />
            <div className="statBoxMain">
                <h3>
                    {name} - {stat.base_stat}
                </h3>
                <div className="statBoxOutBar">
                    <div
                        className="statBoxBar"
                        style={{
                            backgroundColor: color,
                            width: percentage + "%",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
