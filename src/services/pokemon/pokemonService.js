import api from "../api";

export async function getPokemonById(id) {
  return await api.get(`pokemon/${id}`);
}

export async function getPokemonsByInterval(initialAmout, finalAmout) {
  let pokemonList = [];
  for (let i = initialAmout; i <= finalAmout; i++) {
    try {
      const response = await getPokemonById(i);

      if (response.status === 200) {
        pokemonList.push(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return pokemonList;
}

export async function getPokemonSpecieById(id) {
  return await api.get(`pokemon-species/${id}`);
}

export async function getPokemonAbility(id) {
  return await api.get(`ability/${id}`);
}

export async function getTypes() {
  return await api.get(`type/`);
}

export async function getTypeById(id) {
  return await api.get(`type/${id}`);
}
