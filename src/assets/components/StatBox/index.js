import React, { useState, useEffect } from "react";
import "./style/style.css";
import defaultBar from "../../img/bars/bar.svg";
import hpBar from "../../img/bars/hpBar.svg";
import attackBar from "../../img/bars/attackBar.svg";
import defenseBar from "../../img/bars/defenseBar.svg";
import spAttBar from "../../img/bars/spAttBar.svg";
import spDefBar from "../../img/bars/spDefBar.svg";
import speedBar from "../../img/bars/speedBar.svg";

export default function StatBox({ stat }) {
    const [color, setColor] = useState();
    const [name, setName] = useState();
    const [bar, setBar] = useState();

    const getColor = () => {
        switch (stat.stat.name) {
            case "hp":
                setColor("#FF6666");
                setName("HP");
                setBar(hpBar);
                break;
            case "attack":
                setColor("#FF8B66");
                setName("Attack");
                setBar(attackBar);
                break;
            case "defense":
                setColor("#FFC266");
                setName("Defense");
                setBar(defenseBar);
                break;
            case "special-attack":
                setColor("#66FFA3");
                setName("Sp. Att");
                setBar(spAttBar);
                break;
            case "special-defense":
                setColor("#66B6FF");
                setName("Sp. Def");
                setBar(spDefBar);
                break;
            case "speed":
                setColor("#FF7BAB");
                setName("Speed");
                setBar(speedBar);
                break;
            default:
                setColor("#FF6666");
                setName(stat.stat.name);
                setBar(defaultBar);
        }
    };

    const statBar = () => {
        let barList = [];
        let index = 0;
        let base_stat =
            stat.base_stat % 17 ? stat.base_stat + 1 : stat.base_stat;
        let max = parseInt(base_stat / 17 + 1);

        if (max > 15) {
            max = 15;
        }

        for (let i = 0; i < 15 - max; i++) {
            barList.push(
                <img
                    key={`${stat.stat.name}-${index}`}
                    src={defaultBar}
                    draggable="false"
                />
            );
            index++;
        }
        for (let i = 0; i < max; i++) {
            barList.push(
                <img
                    key={`${stat.stat.name}-${index}`}
                    className="coloredBar"
                    src={bar}
                    draggable="false"
                />
            );
            index++;
        }

        return barList;
    };

    useEffect(() => {
        let maxStatValue = 255;
        getColor();
    }, [stat]);

    return (
        <div className="statBox">
            <div className="statIdBox">
                <div className="statValueCircle">
                    <p className="statValue">{stat.base_stat}</p>
                </div>
                <h3>{name}</h3>
            </div>
            <div className="statBoxMain">{statBar()}</div>
        </div>
    );
}
