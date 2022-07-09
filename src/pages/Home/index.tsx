import React, { useEffect, useState } from 'react';
import Nav from "../../components/Navbar";
import Pokemons from '../../components/Pokemons';
import SearchBar from "../../components/SearchBar";

import { getAll, getData, getPokemonName } from "../../services/api";

import imageNotFound from "../../assets/images/pokedex.png";
import { IPokemonRequests, IPokemonSimple } from '../../DOTs/IPokemonRequests';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pokemons, setPokemons] = useState<IPokemonRequests[]>();

  const [page, setPage] = useState<number>(0);
  const [allPages, setAllPages] = useState<number>(0);
  
  // coloca a quantidade de itens exibidos na tela
  const pageItens = 30;
  const getPokemons = async (): Promise<void> => {
      setLoading(true);
      setNotFound(false);

    // se tiver algo no localStorage ele entra
    if (localStorage.getItem("pokemons")) {
      const localList: any = localStorage.getItem("pokemons");
      const list = JSON.parse(localList);
      console.log(list);
      
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
      localStorage.setItem("pokemons", JSON.stringify(res));
      

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

  // Toda vez que a página muda ele executa a função para pegar a nova lista
  useEffect(() => {
    getPokemons();
  }, [page])

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

  return (
    <>
      <Nav />
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
      ) :
        <Pokemons 
          listPokemons={pokemons} 
          loading={loading}
        />
      }
    </>
  
  )
}

export default Page;