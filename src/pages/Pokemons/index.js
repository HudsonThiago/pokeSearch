import React, { useState, useEffect } from "react";
import Body from "../../assets/components/Body";
import Card from "../../assets/components/Card";
import Header from "../../assets/components/Header";
import { getPokemonsByInterval } from "../../services/pokemon/pokemonService";
import "./style/style.css";

let a = true;

export default function Pokemons({ pokemonList, amount }) {
  const [pokemons, setPokemons] = useState([]);
  const [control, setControl] = useState(true);
  const [initialAmout, setInitialAmout] = useState(amount.initialAmount);
  const [finalAmout, setFinalAmout] = useState(amount.finalAmount);

  const setConfig = () => {
    setControl(false);
    setInitialAmout(initialAmout + 30);
    setFinalAmout(finalAmout + 30);
  };

  const getPokemons = async () => {
    let interval = await getPokemonsByInterval(initialAmout, finalAmout);

    interval.forEach((p) => {
      pokemonList.push(p);
    });

    setPokemons(pokemonList);
    setControl(true);
  };

  useEffect(() => {
    if (a === true) {
      a = false;
      setConfig();
      getPokemons();
    }
  }, []);

  const allPokemonList = () => {
    return pokemons.map((p, index) => {
      const image = p.sprites.other["official-artwork"].front_default;
      return (
        <Card
          id={p.id}
          index={index}
          key={p.id}
          name={p.name}
          number={p.id}
          image={image}
          types={p.types}
        />
      );
    });
  };

  const scrolling = async () => {
    const mainContent = document.getElementById("mainContent");
    const scrollTop = Math.ceil(mainContent.scrollTop);
    const offsetHeight = Math.ceil(mainContent.offsetHeight);
    const scrollHeight = Math.ceil(mainContent.scrollHeight);

    if (offsetHeight + scrollTop >= scrollHeight) {
      if (control === true) {
        await setConfig();
        await getPokemons();
      }
    }
  };

  return (
    <Body setPokemons={setPokemons} pokemons={pokemons}>
      <Header title="Pokemons" />
      {pokemons && (
        <>
          <div
            id="mainContent"
            className="pokemonsContent"
            onScroll={scrolling}
          >
            <div className="gradient"></div>
            <div id="mainFrame" className="mainFrame">
              {allPokemonList()}
            </div>
          </div>
        </>
      )}
    </Body>
  );
}
