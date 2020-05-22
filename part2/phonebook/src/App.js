import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsService from './services/persons';
import axios from 'axios'


const App = () => {
	const [ persons, setPersons ] = useState([
  ])
  
	const [ newName, setNewName ] = useState('')
	const [ newFilter, setNewFilter ] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [message, setMessage] = useState(null)
  
	useEffect(() => {
	personsService.
	getAll().then((response) => {setPersons(response);
	});
}, []);	

const addPerson = (event) => {
    event.preventDefault()
   

    const personObject = {
      name: newName,
      number: newNumber
	}
	
if (persons.some(o => o.name.toLowerCase() === personObject.name.toLowerCase())) {
	if (window.confirm(`${personObject.name} is already in the phonebook, do you want to replace the old number with the new one?`)) {
	  updatePerson(personObject.name, personObject.number)
	  setNewName('')
	  setNewNumber('')
	} else {
	  const messageToBeShown = {
		type: `notification`,
		text: `Number was not changed`
	  }
	  setMessage(messageToBeShown)
	  setTimeout(() => { setMessage(null) }, 5000)
	}

  } else {
	  personsService
	.create({ name: newName, number: newNumber })
	  .then(response => {
		setPersons(persons.concat(response))
		const messageToBeShown = {
		  type: `notification`,
		  text: `${personObject.name} added`
		}
		setMessage(messageToBeShown)
		setTimeout(() => { setMessage(null) }, 5000)
		setNewName('')
		setNewNumber('')

	  }).catch(error => {
		const errorToBeShown = {
		  type: `error`,
		  text: `${error.response.data.error}`
		}
		setMessage(errorToBeShown)
		setTimeout(() => { setMessage(null) }, 5000)
	  })
  }
}

const updatePerson = (name, newNumber) => {
  const personToBeUpdated = persons.find(person => person.name.toLowerCase() === name.toLowerCase())

  personToBeUpdated.number = newNumber

  personsService.update(personToBeUpdated.id, personToBeUpdated)
	.then(returnedPerson => {
	  setPersons(persons.map(person => person.id !== personToBeUpdated.id ? person : returnedPerson))
	})
	.then(a => {
	  const messageToBeShown = {
		type: `notification`,
		text: `${personToBeUpdated.name}'s number updated`
	  }
	  setMessage(messageToBeShown)
	  setTimeout(() => { setMessage(null) }, 5000)
	}).catch(error => {
	  const messageToBeShown = {
		type: `error`,
		text: `Person ${personToBeUpdated.name} has already been deleted`
	  }
	  setMessage(messageToBeShown)
	  setTimeout(() => { setMessage(null) }, 5000)
	})

}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	};

	const handleFilterChange = (event) => {
		setNewFilter(event.target.value)
	};
	
	const handleRemove = (id) => {
		const entry = persons.find((person) => person.id === id);
		const alert = window.confirm(`Are you sure you want to delete the entry ${entry.name}?`);
		personsService.remove(id)

	.then(response => {
	  const updatedPersons = persons.filter(person => person.id !== id)
	  setPersons(updatedPersons)
	})
}


	return (
		<div>
			<Filter value={newFilter} onChange={handleFilterChange} />
			<PersonForm 
			newName={newName}
			handleNameChange={handleNameChange} 
			newNumber={newNumber} 
			handleNumberChange={handleNumberChange} 
			addPerson={addPerson} />
    
			<Persons persons={persons} newFilter={newFilter} remove = {handleRemove}/>
		</div>
	)
}
export default App

