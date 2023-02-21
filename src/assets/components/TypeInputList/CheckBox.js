import React, { useState, useEffect } from "react";
import "./style/style.css";

export default function CheckBox({ type }) {
    const checkType = (e) => {
        const check = e.target;

        if (check.checked) {
            localStorage.setItem(type, true);
        } else {
            localStorage.removeItem(type);
        }
    };

    useEffect(() => {
        if (localStorage.getItem(type)) {
            localStorage.removeItem(type);
        }
    }, []);

    return <input type="checkbox" value={type} onClick={(e) => checkType(e)} />;
}
