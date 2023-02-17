import React, { useEffect } from "react";
import "./style/style.css";
import PokeballImage from "../../img/pokeball.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ id, placeholder, button = true }) {
    const searchPokemonName = (text = "") => {
        if (text !== "") {
            localStorage.setItem("searchPokemonName", text);
        } else {
            if (localStorage.getItem("searchPokemonName")) {
                localStorage.removeItem("searchPokemonName");
            }
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
                        <button type="submit" className="searchButton">
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
                    <img src={PokeballImage} alt="pokeball" />
                </div>
            </label>
        </form>
    );
}
