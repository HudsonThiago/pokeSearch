import React from "react";
import './style/style.css';

export default function Input({children, id, name, icon}){

    return (
        <label className="inputContainer" for={id}>
            <input name={name} id={id} type="radio" />
            <div className="inputLabel">
                <p>{children}</p>
                <img src={icon} alt={"icon-"+id} draggable="false" />
            </div>
        </label>
    )
}