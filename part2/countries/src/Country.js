import {useState} from 'react'
import Weather from './Weather'

const Country = ({countries, country}) => {
	const [showDetails, setShowDetails] = useState([])

	const handleClick = e => {
		const toggleCountryDetails = e.target.value
		if (!showDetails.includes(toggleCountryDetails))
			return setShowDetails([...showDetails, e.target.value])

		let removeCountry = showDetails.filter(
			country => country !== toggleCountryDetails
		)
		setShowDetails(removeCountry)
	}

	return (
		<div>
			{countries.length > 1 && (
				<div style={{margin: '1rem'}}>
					<span>{country.name}</span>
					<button
						style={{margin: '0 1rem'}}
						onClick={e => handleClick(e)}
						value={country.name}>
						show
					</button>
				</div>
			)}
			{(countries.length === 1 || showDetails.includes(country.name)) && (
				<div>
					<h2>{country.name}</h2>
					<p>Capital: {country.capital}</p>
					<p>Population: {country.population}</p>
					<h3>Spoken languages</h3>
					<ul>
						{country.languages.map((laguage, index) => (
							<li key={index}>{laguage.name}</li>
						))}
					</ul>
					<img
						src={country.flag}
						alt={country.name}
						style={{width: '10rem'}}
					/>
					<Weather countries={countries} />
				</div>
			)}
		</div>
	)
}

export default Country
