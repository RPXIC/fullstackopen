import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
	const [filtered, setFiltered] = useState([])
	const [persons, setPersons] = useState([])

	useEffect(() => {
		axios
			.get('http://localhost:3001/persons')
			.then(res => setPersons(res.data))
	}, [])

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
