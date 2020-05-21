import React from 'react';
import {useState, useEffect} from  'react'
import axios from 'axios'
import './App.css';

const App = () => {
const [ countries, setCountries ] = useState([])
const [ newFilter, setNewFilter ] = useState('')

/* const hook = () => {

  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then((response) => {

      setCountries(response.data)
    })
}

useEffect(hook, [])

 */
useEffect(() => {
  axios.get('https://restcountries.eu/rest/v2/all').then((response) => setCountries(response.data));
});

const handleFilterChange = (event) => {
  setNewFilter(event.target.value)
}


const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

const countriesToShow = () => {

  if(filteredCountries.length < 11){
  return(
 <div>
{filteredCountries
  .map((country) => 
  
     <div key={country.name}>{country.name}</div>

  )}
  </div>
  )
} else {
  return(
    <div>Too many matches, specify another filter</div>
  )
}
}
  return (
<div>
  <div>

     find countries 
     <input value = {newFilter} onChange = {handleFilterChange} >
      </input>
  </div>
{countriesToShow()}
   </div>
 )
  }

export default App;
