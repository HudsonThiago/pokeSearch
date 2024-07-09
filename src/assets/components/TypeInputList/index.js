import React, { useState, useEffect } from "react";
import "./style/style.css";
import TypeBox from "../TypeBox";
import { asyncGetAllTypes } from "../../../services/utils";
import CheckBox from "./CheckBox";

export default function TypeInputList() {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        const getAllTypes = async () => {
            const types = await asyncGetAllTypes();
            setTypes(types);
        };
        getAllTypes();
    }, []);

    return (
        <>
            {types.length !== 0 && (
                <div className="typeInputList">
                    {types.map((type, index) => (
                        <label key={"typeInput-" + index} className="TypeRow">
                            <div className="checkTypeContent">
                                <CheckBox type={type.name} />
                            </div>
                            <TypeBox key={"type-" + index} type={type} />
                        </label>
                    ))}
                </div>
            )}
        </>
    );
}
