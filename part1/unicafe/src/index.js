import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => (
	<tr>
		<td>{text}</td>
		<td>
			{value}
			{text === 'positive' && ' %'}
		</td>
	</tr>
)

const Statistics = ({good, neutral, bad}) => {
	return (
		<>
			<h1>statistics</h1>
			{!good && !neutral && !bad ? (
				<p>No feedback given</p>
			) : (
				<table>
					<tbody>
						<Statistic text={'good'} value={good} />
						<Statistic text={'neutral'} value={neutral} />
						<Statistic text={'bad'} value={bad} />
						<Statistic text={'all'} value={good + neutral + bad} />
						<Statistic
							text={'average'}
							value={good * 1 + neutral * 0 + bad * -1}
						/>
						<Statistic
							text={'positive'}
							value={(good / (good + neutral + bad)) * 100}
						/>
					</tbody>
				</table>
			)}
		</>
	)
}

const Button = ({setState, state, text}) => (
	<button onClick={() => setState(state + 1)}>{text}</button>
)

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<h1>give feedback</h1>
			<Button setState={setGood} state={good} text={'good'} />
			<Button setState={setNeutral} state={neutral} text={'neutral'} />
			<Button setState={setBad} state={bad} text={'bad'} />
			<br />

			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
