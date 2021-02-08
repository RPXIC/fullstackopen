import {useState} from 'react'
import CountriesList from './CountriesList'
import Searcher from './Searcher'

const App = () => {
	const [countries, setCountries] = useState([])

	return (
		<div className='App' style={{margin: '2rem'}}>
			<h1>Countries</h1>
			<Searcher setCountries={setCountries} />
			<CountriesList countries={countries} />
		</div>
	)
}

export default App
