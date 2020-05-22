import React from 'react';



const Persons = ({persons, newFilter, remove}) => {
  const personsToShow = () =>  
  persons.filter((person)=> 
  person.name.toLowerCase().includes(newFilter.toLowerCase())).map((person) => (
    <div  key ={person.name}> 
    {person.name} {person.number} <button onClick={() => remove(person.id)}>delete</button>
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