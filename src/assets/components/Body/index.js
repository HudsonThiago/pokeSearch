import React, { useEffect } from "react";
import {
    openModal,
    asyncGetAllTypes,
    selectPokemonGroup,
    pokemonPerRequest,
} from "../../../services/utils";
import { useNavigate } from "react-router-dom";
import { allPokemons } from "../../../services/data";
import { getPokemonById } from "../../../services/pokemon/pokemonService";
import Nav from "../Nav";
import Modal from "../Modal";
import Button from "../Button";
import Modal1 from "../Modal/Modal/Modal1";
import MobileMagnifyingGlassIcon from "../../img/icons/mobileMagnifyingGlassIcon.svg";
import MobilePokeballIcon from "../../img/icons/mobilePokeballIcon2.svg";
import MobileHomeIcon from "../../img/icons/mobileHomeIcon.svg";
import SearchBar from "../SearchBar";
import "./style/style.css";

export default function Body({ getPokemons = () => {}, children }) {
    const navigate = useNavigate();

    const action = () => {
        getPokemons(true);
        navigate("/");
    };

    return (
        <>
            <Nav />
            <Modal id={1} action={action} title="Advanced Search" footer={true}>
                <Modal1 />
            </Modal>
            <header>
                <div className="headerContainer">
                    <div className="searchContainer">
                        <SearchBar id="bodySearch" action={action} />
                    </div>
                    <Button
                        onClick={() => {
                            openModal(1);
                        }}
                    >
                        Advanced search
                    </Button>
                </div>
            </header>
            <main>
                <section className="bodyContainer">{children}</section>
            </main>
            <div className="mobileNav">
                <div className="navCircleContainer"></div>
                <div className="mobileIconContainer">
                    <div
                        className="mobileIconBox"
                        onClick={() => {
                            openModal(1);
                        }}
                    >
                        <img
                            src={MobileMagnifyingGlassIcon}
                            alt="MobileMagnifyingGlassIcon"
                        />
                        <p>Search</p>
                    </div>
                    <div className="mobileIconBox">
                        <img
                            className="mobileMenuIcon"
                            src={MobilePokeballIcon}
                            alt="MobilePokeballIcon"
                        />
                    </div>
                    <div
                        className="mobileIconBox"
                        onClick={() => navigate("/")}
                    >
                        <img src={MobileHomeIcon} alt="MobileHomeIcon" />
                        <p>Home</p>
                    </div>
                </div>
            </div>
        </>
    );
}
