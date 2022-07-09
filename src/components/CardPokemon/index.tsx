import React, { useState } from 'react';
import { IPokemonRequests } from '../../DOTs/IPokemonRequests';
import Modal from '../Modal';
import './styled.css';

interface CardProps {
  pokemon: IPokemonRequests;
}

const CardPokemon: React.FC<CardProps> = ({ pokemon }: CardProps) => {
  const [modal, setModal] = useState(false);

  const toogleModal = (): void => {
    setModal(!modal);
  }

  return (
    <>
    <div>
      <div className="card">
        <div className="pokemon-card d-flex">
          <img 
              src={pokemon.sprites.front_default} 
              alt={`Imagem do ${pokemon.name}`} 
            />
          <div className="card-body d-flex flex-column">
            <div className="card-top">
              <span className="fs-4 me-3 pokemon-name" onClick={() => toogleModal()}>{pokemon.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    {modal &&
      <Modal 
        pokemon={pokemon}
        display={setModal}
      />
    }
    </>
  )
}

export default CardPokemon;
