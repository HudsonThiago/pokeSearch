import api from '../api'

export default async function getPokemonById(id) {
    return await api.get(`pokemon/${id}`);
  }