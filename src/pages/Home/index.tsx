import React, { useEffect, useState } from 'react';
import Nav from "../../components/Navbar";
import Pokemons from '../../components/Pokemons';
import SearchBar from "../../components/SearchBar";
import { IPokemon } from '../../DOTs/IPokemonRequests';

import { getAll, getData } from "../../services/api";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<any>();

  const [page, setPage] = useState(0);
  const [allPages, setAllPages] = useState(0);

  const pageItens = 30;
  const getPokemons = async () => {
    try {
      setLoading(true);
      const res = await getAll(pageItens, pageItens * page);
      const promises = res.results.map(async(pokemon: any)=> {
        return await getData(pokemon.url);
      });
      const results = await Promise.all(promises)
      setPokemons(results);
      setLoading(false);
      setAllPages(Math.ceil(res.count / pageItens))
    } catch (error){
      console.log("getPokemons failed", error);
    }
  }

  useEffect(() => {
    getPokemons();
  }, [page])

  return (
    <>
      <Nav />
      <SearchBar 
        page={page}
        setPage={setPage}
        allPages={allPages}
      />
      <Pokemons 
        listPokemons={pokemons} 
        loading={loading}
      />
    </>
  )
}

export default Page;