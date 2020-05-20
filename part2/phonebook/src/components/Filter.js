import React from "react";

const Filter = ({ value, onChange }) => {
	return (
		<div>
			<h2>Phonebook</h2>

			<input value={value} onChange={onChange} />
		</div>
	);
};


export default Filter;