import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
	const [ persons, setPersons ] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ newFilter, setNewFilter ] = useState('')

	const addPerson = (event) => {
		event.preventDefault()
		if (!persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
			setPersons(persons.concat({ name: newName, number: newNumber }))
			setNewName('')
			setNewNumber('')
		} else {
			alert(`${newName} is already added to phonebook`)
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	};

	const handleFilterChange = (event) => {
		setNewFilter(event.target.value)
	};

	return (
		<div>
			<Filter value={newFilter} onChange={handleFilterChange} />
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
    
			<Persons persons={persons} newFilter={newFilter} />
		</div>
	)
}
export default App

