import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import Pokemons from '../../components/Pokemons';
import SearchBar from "../../components/SearchBar";

import { getAll, getData, getPokemonName } from "../../services/api";

import imageNotFound from "../../assets/images/pokedex.png";
import { IPokemonRequests, IPokemonSimple } from '../../DOTs/IPokemonRequests';
import { FavoriteProvider } from '../../contexts/favoritesContexts';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pokemons, setPokemons] = useState<IPokemonRequests[]>();

  const [page, setPage] = useState<number>(0);
  const [allPages, setAllPages] = useState<number>(0);

  const [favorites, setFavorites] = useState<any>( [] );
  
  // coloca a quantidade de itens exibidos na tela
  const pageItens = 30;

  // Função para pegar os pokemons
  const getPokemons = async (): Promise<void> => {
      setLoading(true);
      setNotFound(false);

    // se tiver na página inicial ele usa o localStorage
    if (page === 0 && localStorage.getItem('pokemons')) {
      const localList: any = localStorage.getItem("pokemons");
      const list = JSON.parse(localList);
      
      // Espera pegar todos os resultados para colocar na lista de pokemons
      const promises = list.results.map(async(pokemon: IPokemonSimple)=> {
        return await getData(pokemon.url);
      });
      
      // Pega o resultado de cada pokemon(habilidades,etc.)
      const results: any = await Promise.all(promises)
      setPokemons(results);
      setAllPages(Math.ceil((list.count / pageItens)));
    } else {
      // Faz a requisição na API e guarda no localStorage
      const res = await getAll(pageItens, pageItens * page);
      if (page === 0) {
        localStorage.setItem("pokemons", JSON.stringify(res));
      }
      
      if (res !== undefined) {
          // Espera pegar todos os resultados para colocar na lista de pokemons
          const promises = res.results.map(async(pokemon: IPokemonSimple)=> {
            return await getData(pokemon.url);
          });
          // Pega o resultado de cada pokemon(habilidades,etc.)
          const results: IPokemonRequests[] = await Promise.all(promises)
          
          setPokemons(results);
          setAllPages(Math.ceil((res.count / pageItens)));
        }
    }
    setLoading(false);
  }

  // Função para acahr os pokemons
  const onSearch = async (pokemon: string | undefined): Promise<void> => {
    // se não tiver nada na busca ele executa a função
    if(!pokemon) {
      return getPokemons();
    }
    
    setLoading(true);
    setNotFound(false);
    const res = await getPokemonName(pokemon);

    // Se não encontrou nada, coloca o Error como true e aparece na tela
    if(!res) {
      setLoading(false);
      setNotFound(true);
    } else {
      // Se encontrou, coloca o resultado na lista de pokemons e volta as páginas
      setPokemons([res]);
      setPage(0);
      setAllPages(1);
    }
    setLoading(false)
  }

  // Função para controlar o array de favoritos
  const updateFavoritePokemons = (name: string) => {
      const updatedFavorites = [...favorites]
      const favoriteIndex = favorites.indexOf(name)
      if(favoriteIndex >= 0) {
        updatedFavorites.splice(favoriteIndex, 1);
      }else {
        updatedFavorites.push(name);
      }
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
      setFavorites(updatedFavorites);
  }
  

  // colocar a lista de favoritos no localStorage
  const favoriteLocal = () => {
    const pokemons: any = localStorage.getItem("favorites");
    const pokemonsJSON = JSON.parse(pokemons);
    setFavorites(pokemonsJSON)
  }

  // Toda vez que a página muda ele executa a função para pegar a nova lista
  useEffect(() => {
    getPokemons();
  }, [page])

  // Se tiver um pokemon favorito no localStorage, roda a função
  useEffect(() => {
    if(localStorage.getItem("favorites")) {
      favoriteLocal();
    }
  }, [])

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavorite: updateFavoritePokemons,
      }}
    >
      <Header />
      <SearchBar 
        page={page}
        setPage={setPage}
        allPages={allPages}
        onSearch={onSearch}
      />
      {notFound ? (
          <div className='justify-content-center d-flex text-white'>
            <img src={imageNotFound} alt="Pokemon não encontrado"></img>
          </div>
        ) : (
          <Pokemons 
            listPokemons={pokemons} 
            loading={loading}
          />
        )
      }
    </FavoriteProvider>
  
  )
}

export default Page;