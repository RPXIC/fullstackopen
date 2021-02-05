import React, {useState} from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
	const [filtered, setFiltered] = useState([])
	const [persons, setPersons] = useState([
		{name: 'Arto Hellas', number: '040-123456'},
		{name: 'Ada Lovelace', number: '39-44-5323523'},
		{name: 'Dan Abramov', number: '12-43-234345'},
		{name: 'Mary Poppendieck', number: '39-23-6423122'},
	])

	return (
		<div>
			<h2>Phonebook</h2>

			<Filter
				filtered={filtered}
				persons={persons}
				setFiltered={setFiltered}
			/>

			<h2>add a new</h2>

			<PersonForm persons={persons} setPersons={setPersons} />

			<h2>Numbers</h2>

			<Persons persons={persons} />
		</div>
	)
}

export default App
