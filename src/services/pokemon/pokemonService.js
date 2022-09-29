import api from '../api'

export async function getPokemonById(id) {
  return await api.get(`pokemon/${id}`);
}

export async function getPokemonSpecieById(id) {
  return await api.get(`pokemon-species/${id}`);
}

export async function getPokemonAbility(id){
  return await api.get(`ability/${id}`);
}

export async function getTypeById(id){
  return await api.get(`type/${id}`);
}