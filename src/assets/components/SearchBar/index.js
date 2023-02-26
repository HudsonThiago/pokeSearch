import React, { useEffect } from "react";
import "./style/style.css";
import PokeballImage from "../../img/pokeball.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({
    id,
    placeholder = "",
    action = () => {},
    button = true,
}) {
    const searchPokemonName = (text = "") => {
        if (text !== "") {
            localStorage.setItem("searchPokemonName", text.toLowerCase());
        }
    };

    useEffect(() => {
        searchPokemonName();
    }, []);

    return (
        <form>
            <label className="searchBox" htmlFor={id}>
                <div className="fieldDiv">
                    {button === true && (
                        <button
                            type="submit"
                            className="searchButton"
                            onClick={action}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    )}
                    <input
                        id={id}
                        className="textField"
                        type="text"
                        placeholder={placeholder}
                        maxLength="30"
                        defaultValue=""
                        onChange={(e) => searchPokemonName(e.target.value)}
                    />
                </div>
                <div className="imgDiv">
                    <img src={PokeballImage} alt="pokeball" draggable="false" />
                </div>
            </label>
        </form>
    );
}
