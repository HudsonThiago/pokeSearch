import React, { useState, useEffect } from "react";
import Body from "../../assets/components/Body";
import Card from "../../assets/components/Card";
import Header from "../../assets/components/Header";
import { getPokemonById } from "../../services/pokemon/pokemonService";
import "./style/style.css";

export default function Pokemons() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      let pokemonList = [];
      for (let i = 1; i <= 30; i++) {
        try {
          const response = await getPokemonById(i);

          if (response.status === 200) {
            pokemonList.push(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
      setPokemons(pokemonList);
    };

    getPokemons();
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

  const scrolling = () => {
    const mainContent = document.getElementById("mainContent");

    const scrollTop = Math.ceil(mainContent.scrollTop);
    const offsetHeight = Math.ceil(mainContent.offsetHeight);
    const scrollHeight = Math.ceil(mainContent.scrollHeight);

    if (offsetHeight + scrollTop + 1 >= scrollHeight) {
      console.log("FIM");
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
