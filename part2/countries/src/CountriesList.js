import Country from './Country'

const CountriesList = ({countries}) => (
	<>
		{countries.length >= 10 ? (
			<p>Too many matches, specify another filter</p>
		) : (
			countries.map((country, index) => (
				<Country key={index} countries={countries} country={country} />
			))
		)}
	</>
)

export default CountriesList
