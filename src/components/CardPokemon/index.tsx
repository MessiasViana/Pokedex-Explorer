import React from 'react';
import './styled.css'

const CardPokemon = (props: any) => {
  const { pokemon } = props;
  
  // const toogleModal = () => {
  //   return (
  //     <Modal />
  //   )
  // }
  return (
    <div>
      <div className="card">
        <div className="pokemon-card d-flex ">
          <img 
              src={pokemon.sprites.front_default} 
              alt={`Imagem do ${pokemon.name}`} 
            />
          <div className="card-body d-flex flex-column">
            
            <div className="card-top">
              <span className="fs-4 me-3 pokemon-name">{pokemon.name}</span>
            </div>
            <div className="card-bottom">
              <div className="pokemon-type d-flex">
                <span className="fav">Favoritar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardPokemon;
