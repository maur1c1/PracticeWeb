import React, { useEffect, useState } from 'react'
import { PokemonContext } from './PokemonContext'
import { useForm } from '../hook/useForm';

export const PokemonProvider = ({children}) => {

  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([])
  const [offset, setOffset] = useState(0)

  //utilizar CustomHook - useForm

 const {valueSearch, onInputChange, onResetForm} = useForm({
      valueSearch: ''
 }) 
  
  // Estados para la aplicación simples
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);


  //llamar 40 pokemones a la API

const getAllPokemons = async(limit = 40 )=>{

    const baseURL ='https://pokeapi.co/api/v2/'

    const res =  await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
    const data = await res.json();
//console.log(data)
    const promises = data.results.map(async pokemon => {
      const res = await fetch(pokemon.url)
      const data = await res.json()
      return data;
       
    });

    const results = await Promise.all(promises);

    setAllPokemons([...allPokemons,...results]);
    setLoading(false);

};

// Global Pokemons

//llamar todos los pokemones

const getGlobalPokemons = async() =>{

  
    const baseURL ='https://pokeapi.co/api/v2/'

    const res =  await fetch(`${baseURL}pokemon?limit=100000&offset=0`)
    const data = await res.json();
    console.log(data);

    const promises = data.results.map(async(pokemon) => {
      const res = await fetch(pokemon.url)
      const data = await res.json()
      return data;
       
    })

    const results = await Promise.all(promises)

    setGlobalPokemons(results);
    setLoading(false)

}

//Llamar a un pokemon por ID

const getPokemonByID = async(id) => {

  const baseURL = 'https://pokeapi.co/api/v2/'

  const res = await fetch(`${baseURL}pokemon/${id}`)
  const data = await res.json()
  return data

}

useEffect(()=>{
  getAllPokemons()
}, [])

useEffect(()=>{
  getGlobalPokemons()
}, [])




  return (
    <PokemonContext.Provider value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        globalPokemons,
        getPokemonByID
    }}>
        {children}
    </PokemonContext.Provider>
  );
};


