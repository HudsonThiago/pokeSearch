import React, { useState, useEffect } from "react";
import "./style/style.css";

export default function CheckBox({ type }) {
    const [isChecked, setIsChecked] = useState(false);

    const checkType = (e, type) => {
        if (e.target.checked) {
            localStorage.setItem(type, true);
            setIsChecked(true);
        } else {
            localStorage.removeItem(type);
            e.target.checked = false;
            setIsChecked(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem(type.name)) {
            setIsChecked(true);
        }
    }, []);

    return (
        <>
            {isChecked ? (
                <input
                    type="checkbox"
                    onChange={(e) => checkType(e, type.name)}
                    checked
                />
            ) : (
                <input
                    type="checkbox"
                    onChange={(e) => checkType(e, type.name)}
                />
            )}
        </>
    );
}
