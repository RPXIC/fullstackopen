import {useState} from 'react'
import {addPerson, updatePerson} from './services'

const PersonForm = ({people, setPeople, setMsg}) => {
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		if (newName.trim() === '' || newNumber.trim() === '') return

		const newPerson = {
			name: newName,
			number: newNumber,
		}

		const personExist = people.find(
			person => person.name.toLowerCase() === newName.toLowerCase()
		)

		if (personExist) {
			window.confirm(
				`${newName} is already added to phonebook, replace the old number with the new one?`
			) &&
				updatePerson(personExist, newPerson)
					.then(res => {
						setPeople(
							people.map(person =>
								person.id !== personExist.id ? person : res.data
							)
						)
						setMsg({
							text: `Updated ${newPerson.name}`,
							type: 'success',
						})
					})
					.catch(err => console.log(err))
		} else {
			addPerson(newPerson)
				.then(res => {
					setPeople([...people, res.data])
					setMsg({text: `Added ${newPerson.name}`, type: 'success'})
				})
				.catch(err => {
					setMsg({text: err.response.data.error, type: 'error'})
				})
			setNewName('')
			setNewNumber('')
		}
	}

	const handleChange = (e, type) => {
		type === 'name' && setNewName(e.target.value)
		type === 'number' && setNewNumber(e.target.value)
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
