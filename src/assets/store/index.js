import { configureStore } from "@reduxjs/toolkit";
import pokemonList from "./reducers/pokemonList";

export const store = configureStore({
    reducer: {
        pokemonList,
    },
});
