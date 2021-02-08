const Persons = ({persons}) => (
	<>
		{persons.map((person, index) => (
			<p key={index}>
				{person.name} {person.number}
			</p>
		))}
	</>
)

export default Persons
