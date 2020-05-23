  
import React from 'react';
import {useState, useEffect} from  'react'
import axios from 'axios'
import './App.css';




const apiUrl = "http://api.weatherstack.com/current";
// const api_key = "131935c31c533fc15040a364749cde90";
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY

const Weather = ({country}) => {
    const [newWeather,setWeather] = useState(null);

    useEffect(() => {
       
        axios.get(`${apiUrl}?access_key=${REACT_APP_API_KEY}&query=${country.capital}`).
        then((response) => {
    
         
            const data = response.data.current;
            setWeather( {
              capital: response.data.location,
              temp: data.temperature,
              icons: data.weather_icons,
              windSpeed: data.wind_speed,
              windDir: data.wind_dir,
              descriptions: data.weather_descriptions,
            });
           
        
        })
        .catch((error) => {
            console.error(error);
        });
    },[country.capital]);

    if(newWeather){
   
        return (
            <div>
                <h2>Weather in {country.capital}</h2>

                 <p><b>Temperature: </b>  {newWeather.temp} Celsius {" "} 
                 </p>
                {newWeather.icons.map((icon, i) => (
                <img
                key = {icon}
                src = {icon}
                alt = {newWeather.descriptions[i]}
                height = "50"
                hspace = "5"

                />
                ))}

                 <p>
                   <b>wind:</b> {newWeather.windSpeed} kph direction {newWeather.windDir}
                </p>
             </div>
        );
    }
    else{
        return (<div></div>);
    }
};

const App = () => {
const [ countries, setCountries ] = useState([])
const [ newFilter, setNewFilter ] = useState('')
const [weather, setWeather] = useState('')


useEffect(() => {
  axios.get('https://restcountries.eu/rest/v2/all').then((response) => setCountries(response.data),[]);
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
            <p></p>
            <Weather country ={oneCountry}/>    
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
   </div>)
  }

export default App;
