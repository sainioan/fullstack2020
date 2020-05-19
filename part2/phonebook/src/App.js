import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons)

  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] =useState('')
   
  const addPerson = (event) => {
 
    event.preventDefault();
  
    const personObject = {
      name: newName,
      number: newNumber,
   
    }
   if (persons.some(o => o.name.toLowerCase() === personObject.name.toLowerCase())){ 
      
    let message = `${newName} is already added to phonebook`
    alert( message )
      return
    } else {
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    }
  }
  

  const handleNameChange = (event) => {
 
    event.preventDefault();
    if (persons.find(sameName => sameName === newName)) {
      alert("Name exist");
      return
    }
    console.log(event.target.value)

    setNewName(event.target.value)
  
  }
  const handleNumberChange = (event) =>{
    event.preventDefault();
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  return (
    <div> 

      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
      <div>
        
        name:
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>

      <div>
        number:
        <input
          value={newNumber}
          onChange={handleNumberChange}/>
          <div>
            <button type="submit">add</button>
       </div> 
        
      </div>

      </form>
      <h2>Numbers</h2>
      <div>
          {persons.map(person =>
          <Person key={person.name} name={person.name} number={person.number} /> )}</div>
      <ul> {persons.map((name, number) => 
      <Person key={name} name={name} number = {number}/>
        )}
      </ul>
      </div>
   
  )
}

export default App

