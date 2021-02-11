import React, {useState, useEffect} from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import People from './People'
import Notification from './Notification'
import {getPeople} from './services'
import './index.css'

const App = () => {
	const [filtered, setFiltered] = useState([])
	const [people, setPeople] = useState([])
	const [msg, setMsg] = useState(null)

	useEffect(() => {
		getPeople()
			.then(res => setPeople(res.data))
			.catch(err => console.log(err))
	}, [])

	return (
		<div>
			{msg && <Notification msg={msg} setMsg={setMsg} />}
			<h2>Phonebook</h2>

			<Filter
				filtered={filtered}
				people={people}
				setFiltered={setFiltered}
			/>

			<h2>add a new</h2>

			<PersonForm people={people} setPeople={setPeople} setMsg={setMsg} />

			<h2>Numbers</h2>

			<People people={people} setPeople={setPeople} setMsg={setMsg} />
		</div>
	)
}

export default App
