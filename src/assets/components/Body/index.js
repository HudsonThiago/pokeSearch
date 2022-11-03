import React, { useEffect } from "react";
import SearchBar from "../SearchBar";
import {
  openModal,
  asyncGetAllTypes,
  selectPokemonGroup,
} from "../../../services/utils";
import { allPokemons } from "../../../services/data";
import { getPokemonById } from "../../../services/pokemon/pokemonService";
import TypeInputList from "../TypeInputList";
import Nav from "../Nav";
import Modal from "../Modal";
import Button from "../Button";
import Input from "../Input";
import ItemBody from "../ItemBody";
import CheckGeneration from "../CheckGeneration";
import icon1 from "../../img/icons/gigantamaxIcon.svg";
import icon2 from "../../img/icons/megaEvolutionIcon.svg";
import icon3 from "../../img/icons/babiesIcon.svg";
import icon4 from "../../img/icons/alolanIcon.svg";
import icon5 from "../../img/icons/galarianIcon.svg";
import icon6 from "../../img/icons/hisuianIcon.svg";

import "./style/style.css";

export default function Body({ setPokemons, children }) {
  const modalAction = async () => {
    const types = await asyncGetAllTypes();
    let filteredPokemons = selectPokemonGroup();

    types.forEach((type) => {
      const selectedType = localStorage.getItem(type.name) || null;

      if (selectedType) {
        const pokemonsByType = filteredPokemons.filter((p) => {
          let isType = false;

          p.types.forEach((t) => {
            if (t.type.name.includes(type.name)) {
              isType = true;
            }
          });

          if (isType === true) {
            return true;
          } else {
            return false;
          }
        });

        const pokemonsNotEqual = pokemonsByType.filter((pokemon) => {
          if (filteredPokemons.find((filtered) => filtered.id === pokemon.id)) {
            return false;
          }
          return true;
        });

        filteredPokemons = filteredPokemons.concat(pokemonsNotEqual);
      }
    });

    let pokemonList = [];

    const getFilteredPokemons = async () => {
      filteredPokemons.forEach(async (p) => {
        try {
          const response = await getPokemonById(p.id);
          pokemonList.push(response.data);
        } catch (error) {
          console.log(error);
        }
      });
    };

    getFilteredPokemons().then(() => {
      setTimeout(() => setPokemons(pokemonList), 2000);
    });
  };

  return (
    <>
      <Nav />
      <Modal id={1} action={modalAction}>
        <SearchBar id="modalSearch" placeholder="Search" />
        <div className="modalColumns">
          <div className="c1">
            <ItemBody className="mt-1" title="Generation">
              <div className="overflow-x">
                <CheckGeneration id="1" title="I" value="1" />
                <CheckGeneration id="2" title="II" value="2" />
                <CheckGeneration id="3" title="III" value="3" />
                <CheckGeneration id="4" title="IV" value="4" />
                <CheckGeneration id="5" title="V" value="5" />
                <CheckGeneration id="6" title="VI" value="6" />
                <CheckGeneration id="7" title="VII" value="7" />
                <CheckGeneration id="8" title="VIII" value="8" />
              </div>
            </ItemBody>
            <ItemBody className="mt-1" id="modal-search" title="Forms">
              <div className="grid2Columns">
                <div>
                  <Input id="gigantamaxGroup" icon={icon1} name="form">
                    Gigantamax
                  </Input>
                </div>
                <div>
                  <Input id="megaEvolutionGroup" icon={icon2} name="form">
                    Mega evolution
                  </Input>
                </div>
                <div>
                  <Input id="babiesGroup" icon={icon3} name="form">
                    Babies
                  </Input>
                </div>
                <div>
                  <Input id="alolanGroup" icon={icon4} name="form">
                    Alolan forms
                  </Input>
                </div>
                <div>
                  <Input id="galarianGroup" icon={icon5} name="form">
                    Galarian forms
                  </Input>
                </div>
                <div>
                  <Input id="hisuianGroup" icon={icon6} name="form">
                    Hisuian forms
                  </Input>
                </div>
              </div>
            </ItemBody>
          </div>
          <div className="c2">
            <ItemBody className="mt-1" title="Types">
              <TypeInputList />
            </ItemBody>
          </div>
        </div>
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
    </>
  );
}
