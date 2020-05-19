import React from 'react'

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) =>{
    return (
        <form onSubmit = {addPerson}> 
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
                onChange={handleNumberChange} 
                />
            <div>
                <button type="submit">add</button>
            </div>
            </div>
        </form>
    )
}

export default PersonForm