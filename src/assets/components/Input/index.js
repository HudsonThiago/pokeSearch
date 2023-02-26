import React from "react";
import "./style/style.css";

export default function Input({ children, id, title, name, icon }) {
    const checkGroup = (e) => {
        const check = e.target;
        const inputs = document.querySelectorAll("[data-input]");
        inputs.forEach((i) => {
            if (i.value != id) {
                i.checked = false;
            }
        });
        if (check.checked) {
            localStorage.setItem("group", check.value);
        } else {
            localStorage.removeItem("group");
        }
    };

    return (
        <label className="inputContainer" htmlFor={id}>
            <input
                name={name}
                id={id}
                value={id}
                type="checkbox"
                onChange={(e) => checkGroup(e)}
                data-input={id}
            />
            <div className="inputLabel">
                <p>{title}</p>
                <img src={icon} alt={"icon-" + id} draggable="false" />
            </div>
        </label>
    );
}
