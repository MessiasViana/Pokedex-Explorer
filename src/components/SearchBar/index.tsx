import React, {useState} from "react";
import { IPokemonRequests } from "../../DOTs/IPokemonRequests";
import { getPokemonName } from "../../services/api";

const SearchBar = (props: any) => {
  const { page, allPages, setPage } = props;
  const [search, setSearch] = useState("pikachu");
  const [pokemon, setPokemon] = useState<IPokemonRequests>();
  const options = [0, 100, 200, 300];

  const onChange = (e: any) => {
    setSearch(e.target.value);
  };

  const buttonClick = () => {
    searchName(search);
  }

  const searchName = async(name: any) => {
    const res = await getPokemonName(name);
    setPokemon(res);
  }

  const previusClick = () => {
    if(page > 0) {
      setPage(page - 1)
    }
  }
  const NextClick = () => {
    if(page+1 <= allPages) {
      setPage(page + 1)
    }
  }

  return (
    <div className="mb-1  bg-secondary p-3 rounded">
      <div className="justify-content-around d-flex">
      
        <div>
          <label  className="form-label fs-3 text-white">Nome do Pokemon:</label>
          <div className="d-flex">
            <input 
              type="text" 
              className="form-control"  
              placeholder="Ex: Bulbasaur"
              onChange={onChange}
            />
            <button 
              type="button" 
              className="btn btn-primary ms-1" 
              onClick={buttonClick}
            >Procurar</button>
          </div>
        </div>

        <div className="d-flex align-middle">
          <nav>
            <ul className="pagination">
              <li className="page-item disabled" onClick={previusClick}>
                <span className="page-link">Previous</span>
              </li>
              <li className="page-item active" aria-current="page">
                <span className="page-link">{page} de {allPages}</span>
              </li>
              
              <li className="page-item">
                <span className="page-link" onClick={NextClick}>Next</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default SearchBar;