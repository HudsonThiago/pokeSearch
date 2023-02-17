import React, { useEffect, useState } from "react";
import "./style/style.css";

export default function CheckGeneration({ id, title, value }) {
    const [check, setCheck] = useState(false);

    const changeValue = () => {
        const checkButton = document.getElementById(`checkButton-${id}`);
        const check = document.getElementById(`check-${id}`);

        if (check.checked) {
            setCheck(true);
            checkButton.classList.add("active");
            localStorage.setItem(`generation-${value}`, true);
        } else {
            setCheck(true);
            checkButton.classList.remove("active");
            if (localStorage.getItem(`generation-${value}`))
                localStorage.removeItem(`generation-${value}`);
        }
    };

    useEffect(() => {
        changeValue();
    }, []);

    return (
        <>
            <label
                id={`checkButton-${id}`}
                htmlFor={`check-${id}`}
                className="generationBox"
                onClick={changeValue}
            >
                <p>{title}</p>
                <input
                    id={`check-${id}`}
                    type="checkbox"
                    name="generation"
                    value={value}
                />
            </label>
        </>
    );
}
