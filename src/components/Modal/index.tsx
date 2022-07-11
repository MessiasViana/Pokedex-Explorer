import React from 'react';
import { IPokemon, IPokemonRequests } from '../../DOTs/IPokemonRequests';

interface ModalProps {
  pokemon: IPokemonRequests;
  display: (value: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({pokemon, display}: ModalProps) => {
  
  return (
  <div className="modal d-block">
      <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{pokemon.name}</h5>
        </div>
        <div className="modal-body">
          <p>ID: {pokemon.id}</p>
          <p>XP base: {pokemon.base_experience}</p>
          <p>Altura: {pokemon.height}</p>
            <p className="d-flex">Tipo:
              {pokemon.types.map((type: IPokemon, index: number) =>
                <span key={index} className={`ms-2 pe-2 ps-2 type-${type.type.name}`}>{type.type.name}</span>
              )}
            </p>
          <p className="d-flex">Habilidade: {pokemon.abilities.map((abilities: IPokemon, index: number) =>
            <span key={index} className="ms-2 pe-2 ps-2 border border-danger">{abilities.ability.name}</span>
          )}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={() => display(false)}>Fechar</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Modal;