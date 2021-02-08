import {deletePerson} from './services'

const Persons = ({persons, setPersons, setMsg}) => {
	const handleClick = (id, name) => {
		window.confirm(`Delete ${name}`) &&
			deletePerson(id)
				.then(() =>
					setPersons(persons.filter(person => person.id !== id))
				)
				.catch(err => {
					setMsg({
						text: `Information of ${name} has already been removed from server`,
						type: 'error',
					})
					console.log(err)
				})
	}

	return (
		<>
			{persons.map(person => (
				<div key={person.id}>
					<span>
						{person.name} {person.number}
					</span>
					<button
						onClick={() => handleClick(person.id, person.name)}
						style={{margin: '.5rem'}}>
						delete
					</button>
				</div>
			))}
		</>
	)
}

export default Persons
