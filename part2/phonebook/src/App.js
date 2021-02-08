import React, {useState, useEffect} from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'
import {getPersons} from './services'
import './index.css'

const App = () => {
	const [filtered, setFiltered] = useState([])
	const [persons, setPersons] = useState([])
	const [msg, setMsg] = useState(null)

	useEffect(() => {
		getPersons()
			.then(res => setPersons(res.data))
			.catch(err => console.log(err))
	}, [])

	return (
		<div>
			{msg && <Notification msg={msg} setMsg={setMsg} />}
			<h2>Phonebook</h2>

			<Filter
				filtered={filtered}
				persons={persons}
				setFiltered={setFiltered}
			/>

			<h2>add a new</h2>

			<PersonForm
				persons={persons}
				setPersons={setPersons}
				setMsg={setMsg}
			/>

			<h2>Numbers</h2>

			<Persons
				persons={persons}
				setPersons={setPersons}
				setMsg={setMsg}
			/>
		</div>
	)
}

export default App
