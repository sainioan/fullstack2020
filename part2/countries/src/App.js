  
import React from 'react';
import {useState, useEffect} from  'react'
import axios from 'axios'
import './App.css';

const App = () => {
const [ countries, setCountries ] = useState([])
const [ newFilter, setNewFilter ] = useState('')


useEffect(() => {
  axios.get('https://restcountries.eu/rest/v2/all').then((response) => setCountries(response.data));
});

const handleFilterChange = (event) => {
  setNewFilter(event.target.value)
}
const handleClick = (cName) => {
  setNewFilter(cName)
}



const countriesToShow = () => {
const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
  if (newFilter === ''){
    return(
      <p></p>
    )
  }
  if(filteredCountries.length ===1 ) {
    const oneCountry = filteredCountries[0]
    return (
      <div>
      <h1>{oneCountry.name}</h1>
      <p>capital {oneCountry.capital}</p>
      <p>population {oneCountry.population}</p>
      <h4>languages</h4>
      <ul>
        {oneCountry.languages.map((c) => <li key = {c.name}> {c.name}</li>)}
      </ul>
      <img src = {oneCountry.flag} width = "200"/>
      </div>
        )
      }
  if(filteredCountries.length < 11 & filteredCountries.length > 1){
  return(
       <div> {filteredCountries
              .map((country) => 
        <div key={country.name}>{country.name}
          <button onClick={() => handleClick(country.name)}>
                show
          </button>
        </div>)}
        </div>)
    } else {
  return(
    <div>Too many matches, specify another filter</div>)}
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
