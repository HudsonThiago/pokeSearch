import { createAction, createReducer } from "@reduxjs/toolkit";
import { pokemonPerRequest } from "../../../services/utils";

const LIST_OBJ = {
    length: 0,
    inicialAmout: 1,
    finalAmout: pokemonPerRequest,
};

export const pokemonListState = createAction("LIST_OBJ");

export default createReducer(LIST_OBJ, {
    [pokemonListState.type]: (state, action) => action.payload,
});
