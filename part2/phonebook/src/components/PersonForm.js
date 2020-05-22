import React from 'react'

const PersonForm = (props) => {
    return (
		<div>
			<h3>add a new </h3>
        <form onSubmit={props.addPerson}>
            <div>
                name: <input value={props.newName}
                    onChange={props.handleNameChange}
                />
            </div>
            <div>
                number: <input value={props.newNumber}
                    onChange={props.handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
</div>
    )
}

export default PersonForm