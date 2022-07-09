import React, {useState} from "react";
import './styled.css';
interface ISearchProps {
  page: number;
  allPages: number;
  setPage: (value: number) => void;
  onSearch: (value: undefined | string) => Promise<void>;
}

const SearchBar = ({ page, allPages, setPage, onSearch }: ISearchProps) => {
  const [search, setSearch] = useState("");

  // pega o valor da busca, se não tiver nada ele passa a props para gerar a lista inicial
  const onChange = (e: string): void => {
    setSearch(e);
    if(e.length === 0) {
      onSearch(undefined);
    }
  };

  const buttonClick = (): void => {
    onSearch(search);
  }

  // Mudança de página
  const previusClick = (): void => {
    if(page > 0) {
      setPage(page - 1)
    }
  }

  const NextClick = (): void => {
    if(page + 1 <= allPages) {
      setPage(page + 1)
    }
  }

  return (
    <div className="mb-1  mt-3 bg-secondary p-3 rounded container-sm">
      <div className="justify-content-around d-flex SearchBar">
      
        <div>
          <label  className="form-label fs-3 text-white">Nome do Pokemon:</label>
          <div className="d-flex">
            <input 
              type="text" 
              className="form-control"  
              placeholder="Ex: Bulbasaur"
              onChange={(e) => onChange(e.target.value)}
            />
            <button 
              type="button" 
              className="btn btn-primary ms-1" 
              onClick={buttonClick}
            >Procurar</button>
          </div>
        </div>

        
        <div className="d-flex flex-column text-center  justify-content-between area-pag-fav">
          <div>
            <nav>
              <ul className="pagination">
                <li className={`page-item${page === 0 ? ' disabled' : ' active'} tooglePage`} onClick={previusClick}>
                  <span className="page-link  text-black">Voltar</span>
                </li>
                <li className="page-item" aria-current="page">
                  <span className="page-link ">{page + 1} de {allPages}</span>
                </li>
                
                <li className={`page-item${page + 1 < allPages ? ' active' : ' disabled'} tooglePage`}>
                  <span className="page-link text-black" onClick={NextClick}>Próxima</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar;