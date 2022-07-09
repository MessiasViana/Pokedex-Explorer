import { IPokemonRequests, IPokemonApiRequest } from "../DOTs/IPokemonRequests";

const BASE = "https://pokeapi.co/api/v2/";

export const getPokemonName = async (pokemonName: string): Promise<IPokemonRequests | undefined> => {
  try {
    let url=`${BASE}pokemon/${pokemonName.toLowerCase()}`;
    const content = await fetch(url);
    const response: IPokemonRequests = await content.json(); 
    return response;
  } catch {
    return undefined;
  }
}
export const getAll = async (limit: number, offset: number): Promise<IPokemonApiRequest | undefined> => {
  try {
    let url=`${BASE}pokemon/?limit=${limit}&offset=${offset}`;
    const content = await fetch(url);
    const response: IPokemonApiRequest = await content.json(); 
    return response;
  } catch {
    return undefined;
  }
}
export const getData = async (url: string): Promise<any> => {
  try {
    const content = await fetch(url);
    const response: Promise<IPokemonRequests[]> = await content.json();
    return response;
  } catch {
    return undefined;
  }
}