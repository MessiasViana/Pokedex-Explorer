import React, { useState } from 'react';
import { IPokemonRequests } from '../../DOTs/IPokemonRequests';

interface ModalProps {
  pokemon: IPokemonRequests;
  display: (value: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({pokemon, display}: ModalProps) => {
  const [openModal, setOpenModal] = useState(true);

  display(openModal);
  return (
  <div className={`modal${openModal === true ? ' d-block' : ' d-none'}`}>
      <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{pokemon.name}</h5>
        </div>
        <div className="modal-body">
          <p>ID: {pokemon.id}</p>
          <p>XP base: {pokemon.base_experience}</p>
          <p>Altura: {pokemon.height}</p>
          <p className="d-flex">Tipo: {pokemon.types.map((type:any, index:any) =>
            <div key={index} className="ms-2">{type.type.name}</div>
          )}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={() => setOpenModal(false)}>Fechar</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Modal;