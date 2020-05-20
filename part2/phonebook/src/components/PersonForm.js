import React from 'react'


const PersonForm = ({ addEntry, newName, handleNameChange, newNumber, handleNumberChange }) => {
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
};

export default PersonForm