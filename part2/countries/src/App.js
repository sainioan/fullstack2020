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

// const countriesToShow = countries.filter((country) => country.name.toLowerCase().includes(newFilter.toLowerCase()))

const filteredCountries = countries.filter(c => c.name.toLowerCase().includes(newFilter.toLowerCase()))

  
  return (
<div>
  <div>

     find countries 
     <input value = {newFilter} onChange = {handleFilterChange} >
      </input>
  </div>

 <div>
 {filteredCountries
   .map((country) => <p> {country.name}</p>
 
   )}
   </div>
   </div>
 )
  }

export default App;
