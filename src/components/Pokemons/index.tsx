import React from 'react';
import { IPokemonRequests } from '../../DOTs/IPokemonRequests';
import CardPokemon from '../CardPokemon';

const Pokemons = (props: any) => {
  const { listPokemons, loading } = props;

  return (
    <div className="container-sm mb-5 mt-5">
      <div className="ts-3 text-white">
        <h2>Pokemons</h2>
      </div>
      {loading ? (
          <div>
            <span className="ts-3 text-white">Carregando...</span>
          </div>
        ) : (
          <div className="container-sm card-area">
            {listPokemons && listPokemons.map((pokemon: IPokemonRequests, index: number) =>
              <CardPokemon key={index} pokemon={pokemon}/>
              )}
          </div>
        )
      }
      

    </div>
  )
}

export default Pokemons;