const Filter = ({filtered, people, setFiltered}) => {
	const handleSearch = e => {
		const query = e.target.value

		if (!query.trim()) return setFiltered([])

		const result = people.filter(obj =>
			obj.name.toLowerCase().includes(query.toLowerCase())
		)
		setFiltered(result)
	}

	return (
		<>
			<p>
				filter shown with <input onChange={e => handleSearch(e)} />
			</p>
			{filtered.length > 0 &&
				filtered.map(person => (
					<p key={person.id}>
						{person.name} {person.number}
					</p>
				))}
		</>
	)
}

export default Filter
