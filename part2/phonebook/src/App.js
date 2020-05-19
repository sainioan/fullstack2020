import React, { useState } from 'react'
import Person from './components/Person'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {

    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,

    }
    if (persons.some(o => o.name.toLowerCase() === personObject.name.toLowerCase())) {

      let message = `${newName} is already added to phonebook`
      alert(message)
      return
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const addFilter = (event) => {
    event.preventDefault()

    const filterObject = {
      text: newFilter
    }
  }
  const handleNameChange = (event) => {

    event.preventDefault();
    if (persons.find(sameName => sameName === newName)) {
      window.alert("Name exist");
      return
    }
    console.log(event.target.value)

    setNewName(event.target.value)

  }
  const handleNumberChange = (event) => {
    event.preventDefault();
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const setQuery = (query) => {
    let p = persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
    //setDisplayRows(p)
   // console.log(displayRows)
  }
  const handleFilterChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
    setNewFilter(event.target.valeu)
  }


  return (
    <div>

      <h2>Phonebook</h2>
      <Filter filter={newFilter} onChange={handleFilterChange} />
      <h3>Add a new </h3>
      {/* <form onSubmit={addPerson}> */}
{/*         <div>

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
            onChange={handleNumberChange} />
          <div>
            <button type="submit">add</button>
          </div>

        </div>
 */}
      {/* </form> */}
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />

      <h2>Numbers</h2>
      
{/*         {persons.map(person =>
          <Person key={person.name} name={person.name} number={person.number} />)} */}
        
     
      <ul> {persons.map((name, number) =>
        <Person key={name} name={name} number={number} />
        
      )}

        <Persons filter={newFilter} persons={persons}/>
      </ul>
    </div>)
}

export default App

