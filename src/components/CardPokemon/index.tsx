import React, { useState, useContext } from 'react';
import FavoriteContext from '../../contexts/favoritesContexts';
import { IPokemon, IPokemonRequests } from '../../DOTs/IPokemonRequests';
import Modal from '../Modal';
import './styled.css';

interface CardProps {
  pokemon: IPokemonRequests;
}

const CardPokemon: React.FC<CardProps> = ({ pokemon }: CardProps) => {
  const [modal, setModal] = useState(false);
  const { favoritePokemons, updateFavorite } = useContext(FavoriteContext);

  // Habilita se o modal é visivel
  const toogleModal = (): void => {
    setModal(!modal);
  }

  // Manda o nome do pokemon para colocar nos favoritos
  const onFavoriteClick = () => {
    updateFavorite(pokemon.name);
  }
  
  // Muda a frase no card do pokemon
  const favStatement = favoritePokemons.includes(pokemon.name) ? "Desfavoritar" : "Favoritar";
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
            <div className="card-bottom">
              <span className="d-flex">Tipo:
                {pokemon.types.map((type: IPokemon, index: number) =>
                  <span key={index} className={`ms-2 pe-2 ps-2 type-${type.type.name}`}>{type.type.name}</span>
                )}
                </span>
                <span onClick={onFavoriteClick} className="mt-1 fav-item">
                  {favStatement}
                </span>
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
