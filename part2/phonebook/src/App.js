import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import personsService from './services/persons';
import './App.css';
import './index.css';



const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newFilter, setNewFilter] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [message, setMessage] = useState(null)
	const [styleType, setStyleType ] = useState(null);
  
	useEffect(() => {
	personsService.getAll().then((response) => {setPersons(response);
	});
}, []);	

const addPerson = (event) => {
    event.preventDefault()
   

    const personObject = {
      name: newName,
      number: newNumber
	}
	
if (persons.some(contact => contact.name.toLowerCase() === personObject.name.toLowerCase())) {
	if (window.confirm(`${personObject.name} is already added to the phonebook. Do you want to replace the old number with a new one?`)) {
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
	  return
	}

  } else {
	  personsService

	  .create(personObject)
	  .then(response => {
		setPersons(persons.concat(response))

		setMessage(`${personObject.name} added`)
		setStyleType('notification');
		setTimeout(() => { setMessage(null) }, 5000)
		setNewName('')
		setNewNumber('')

	  }).catch(error => {
		const errorM = JSON.stringify(error.response.data)
		console.log(error.response.data);
		setMessage(`${errorM}`);
	    setStyleType('error');
		setTimeout(() => { 
			setMessage(null) 
			setStyleType(null)
		}, 5000)
		
	  })
  }
}

const updatePerson = (name, newNumber) => {
  const personToBeUpdated = persons.find(person => person.name.toLowerCase() === name.toLowerCase())

  personToBeUpdated.number = newNumber

  personsService.update(personToBeUpdated.id, personToBeUpdated)
	.then(thisPerson => {
	  setPersons(persons.map(person => person.id !== personToBeUpdated.id ? person : thisPerson))
	})
	.then(mess => {

	  setMessage(`${personToBeUpdated.name}'s number updated`)
	  setStyleType('notification')
	  setTimeout(() => {
		   setMessage(null)
			setStyleType(null)
		}, 5000)
	}).catch(error => {
		setMessage(	`${personToBeUpdated.name} has already been deleted`)
		setStyleType('error');
        setTimeout(() => {
		  setMessage(null)
		  setStyleType(null);
        }, 5000)  

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
		
		const personToBeUpdated = persons.find((person) => person.id === id);
		const alert = window.confirm(`Are you sure you want to delete the entry ${personToBeUpdated.name}?`);
		if(alert) {
		personsService.remove(id)
		.catch(error => {
			setStyleType('error')
			setMessage(	`${personToBeUpdated.name} has already been deleted`)
			setStyleType('error')
			setTimeout(() => {
				setMessage(null)
				setStyleType(null)
			  }, 5000)
		})

	.then(response => {
	  const updatedPersons = persons.filter(person => person.id !== id)
	  setPersons(updatedPersons)
	})
} else {
	return;
}
}
	return (
		<div>
			<Filter value={newFilter} onChange={handleFilterChange} />
			<p></p>
			<Notification message={message}  type={styleType} />
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

