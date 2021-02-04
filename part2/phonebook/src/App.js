import React, {useState} from 'react'

const App = () => {
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filtered, setFiltered] = useState([])
	const [persons, setPersons] = useState([
		{name: 'Arto Hellas', number: '040-123456'},
		{name: 'Ada Lovelace', number: '39-44-5323523'},
		{name: 'Dan Abramov', number: '12-43-234345'},
		{name: 'Mary Poppendieck', number: '39-23-6423122'},
	])

	const handleSubmit = e => {
		e.preventDefault()
		const newPerson = {
			name: newName,
			number: newNumber,
		}

		const arrValues = persons.map(person => person.name)
		if (arrValues.includes(newName)) {
			return alert(`${newName} is already added to phonebook`)
		} else {
			setPersons([...persons, newPerson])
			setNewName('')
			setNewNumber('')
		}
	}

	const handleChange = (e, type) => {
		if (type === 'name') {
			setNewName(e.target.value)
		} else if (type === 'number') {
			setNewNumber(e.target.value)
		}
	}

	const handleSearch = e => {
		const query = e.target.value

		if (!query.trim()) return setFiltered([])

		const result = persons.filter(obj =>
			obj.name.toLowerCase().includes(query.toLowerCase())
		)
		setFiltered(result)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<p>
				filter shown with <input onChange={e => handleSearch(e)} />
			</p>
			{filtered.length > 0 &&
				filtered.map((person, index) => (
					<p key={index}>
						{person.name} {person.number}
					</p>
				))}

			<h2>add a new</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name:{' '}
					<input
						value={newName}
						onChange={e => handleChange(e, 'name')}
					/>
				</div>
				<div>
					number:{' '}
					<input
						value={newNumber}
						onChange={e => handleChange(e, 'number')}
					/>
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person, index) => (
				<p key={index}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	)
}

export default App
