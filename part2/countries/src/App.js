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
if(filteredCountries.length ===1 ) {
  return (
    <div>
{filteredCountries
  .map((country) => 
  
<div key={country.name}><h2>{country.name}</h2>
<p>capital {country.capital}</p> 
<p>population {country.population}</p>
<h4>languages</h4>
 <div><ul>{filteredCountries
 .map((country) => country.languages.map((language) =>
  
     <li key={language.name}>{language.name}</li>

  ))}</ul></div> 

<div>
  <img src = {country.flag} width = "200"/>
  </div> 
</div>

  )}
  </div>
  )
  
}
  if(filteredCountries.length < 11 & filteredCountries.length > 1){
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
