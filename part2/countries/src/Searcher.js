import {useEffect, useState} from 'react'
import axios from 'axios'

const Searcher = ({setCountries}) => {
	const [allCountries, setAllCountries] = useState([])

	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(res => setAllCountries(res.data))
	}, [setAllCountries])

	const handleChange = e => {
		const query = e.target.value
		const results = allCountries.filter(country =>
			country.name.toLowerCase().includes(query.toLowerCase())
		)
		setCountries(results)
	}
	return <input onChange={handleChange} autoFocus />
}

export default Searcher
