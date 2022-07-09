export interface IPokemonRequests {
  url: string;
  name: string;
  weight: string;
  sprites: {
    front_default: string;
  };
  base_experience: number;
  types: [];
  id: number;
  height: number;
  abilities: [];
}

export interface IPokemonApiRequest {
  count: number;
  results: Array<IPokemonSimple>;
}

export interface IPokemonSimple {
  name: string;
  url: string;
}

export interface IPokemon {
  type: { name: string },
  ability: { name: string }
}