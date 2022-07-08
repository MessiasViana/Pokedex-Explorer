const BASE = "https://pokeapi.co/api/v2/";

export const getPokemonName = async (pokemonName: any) => {
  try {
    let url=`${BASE}pokemon/${pokemonName}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error", error);
  }
}
export const getAll = async (limit: number, offset: number) => {
  try {
    let url=`${BASE}pokemon/?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error", error);
  }
}
export const getData = async (url: string) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error", error);
  }
}