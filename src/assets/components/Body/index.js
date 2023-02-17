import React, { useEffect } from "react";
import {
    openModal,
    asyncGetAllTypes,
    selectPokemonGroup,
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
import "./style/style.css";

export default function Body({
    getPokemons = () => {},
    setInitialAmout = () => {},
    setFinalAmout = () => {},
    pokemons,
    children,
}) {
    const navigate = useNavigate();

    const modalAction = () => {
        setInitialAmout(0);
        getPokemons(true);
    };

    return (
        <>
            <Nav />
            <Modal
                id={1}
                action={modalAction}
                title="Advanced Search"
                footer={true}
            >
                <Modal1 />
            </Modal>
            <header>
                <div className="headerContainer">
                    <div>
                        Search
                        {/* <SearchBar
                            pokemons={pokemons}
                            pokemonNameField={pokemonNameField}
                            setPokemonNameField={setPokemonNameField}
                            filteredPokemons={filteredPokemons}
                            setFilteredPokemons={setFilteredPokemons}
                        /> */}
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
                    <div className="mobileIconBox">
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
