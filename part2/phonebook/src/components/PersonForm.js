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

/* const PersonForm = ({ addEntry, newName, handleNameChange, newNumber, handleNumberChange }) => {
	return (
		<div>
			<h3>add a new </h3>

			<form onSubmit={addEntry}>
				<div>
					name: <input value={newName} onChange={handleNameChange} required />
				</div>
				<div>
					number:{' '}
					<input
						value={newNumber}
						onChange={handleNumberChange}
						required
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</div>
	);
}; */

export default PersonForm