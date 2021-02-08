import {useState, useEffect} from 'react'
import axios from 'axios'
const API_KEY = process.env.REACT_APP_API_KEY

const Weather = ({countries}) => {
	const [weather, setWeather] = useState(null)

	useEffect(() => {
		if (!weather || weather.location.country !== countries[0].name) {
			const {name} = countries[0]
			axios
				.get(
					`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${name}`
				)
				.then(res => setWeather(res.data))
		}
	}, [countries, weather])

	return (
		<div>
			{weather && (
				<>
					<h2>Weather in {weather.location.name}</h2>
					<p>
						<b>Temperature: </b>
						{weather.current.temperature} Celsius
					</p>
					<img
						src={weather.current.weather_icons[0]}
						alt={weather.location.name}
					/>
					<p>
						<b>Wind: </b>
						{weather.current.wind_speed} Mph direction{' '}
						{weather.current.wind_dir}
					</p>
				</>
			)}
		</div>
	)
}

export default Weather
