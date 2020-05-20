import React from 'react';



const Persons = ({persons, newFilter}) => {
  const personsToShow = () =>  
  persons.filter((person)=> 
  person.name.toLowerCase().includes(newFilter.toLowerCase())).map((person) => (
    <div key ={person.name}> 
    {person.name} {person.number}
    </div>
  ))
return(
  <div>
    <h3>Numbers</h3>
    {personsToShow()}
  </div>

)

}
export default Persons