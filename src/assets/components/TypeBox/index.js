import React from "react";
import "./style/style.css";
import { upperCaseFirstLetter, getTypeColor } from "../../../services/utils";

export default function TypeBox({ type }) {
    let color = getTypeColor(type);

    return (
        <div
            className="typeBox"
            style={{
                background: `linear-gradient(90deg, #ffffff 0%, #${color}99 100%)`,
            }}
        >
            <div className="typeBoxGradient">
                <div className="typeTitleBox">
                    <img
                        className="typeImage"
                        src={require(`../../img/types/${type.name}.png`)}
                        alt={type.name}
                        draggable="false"
                    />
                    <p>{upperCaseFirstLetter(type.name)}</p>
                </div>
                {type.quadrupleDamage ? (
                    <div className="weaknessTag">
                        <p className="weakNessTagText">4X</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
