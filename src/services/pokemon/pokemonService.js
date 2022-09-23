import api from '../api'

export async function getPokemonById(id) {
  return await api.get(`pokemon/${id}`);
}

export async function getPokemonSpecieById(id) {
  return await api.get(`pokemon-species/${id}`);
}