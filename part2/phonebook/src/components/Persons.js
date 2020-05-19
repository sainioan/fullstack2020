import React from 'react'
import Person from './Person'

const Persons = ({ filter, persons }) => {
    return (
      persons.filter(person =>
        person.name.includes(filter)).map(person =>
          <div key={person.id}>
            <Person 
              name={person.name} 
              number={person.number} 
            />
            {' '}
            <button 
              type="button" 
              value={person.id}
              >
             
            </button>
            <br />
          </div>
        )
    )
  }
export default Persons