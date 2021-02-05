import {useState} from 'react'

const PersonForm = ({persons, setPersons}) => {
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

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

	return (
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
	)
}

export default PersonForm
