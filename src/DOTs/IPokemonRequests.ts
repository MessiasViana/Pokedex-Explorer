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
}

export interface IPokemonApiRequest {
  count: number;
  results: Array<IPokemonSimple>;
}

export interface IPokemonSimple {
  name: string;
  url: string;
}