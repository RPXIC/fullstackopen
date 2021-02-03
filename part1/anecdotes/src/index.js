import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState([])

	const handleNext = selected => {
		const index = Math.floor(Math.random() * anecdotes.length)
		selected === index ? handleNext(selected) : setSelected(index)
	}

	const handleVote = selected => {
		if (!votes.length) {
			const arr = new Array(anecdotes.length).fill(0)
			arr[selected] = 1
			return setVotes(arr)
		}
		const votesCopy = [...votes]
		votesCopy[selected] += 1
		setVotes(votesCopy)
	}

	return (
		<>
			<h1>Anecdote of the day</h1>
			<p>{anecdotes[selected]}.</p>
			<p>has {votes[selected] ? votes[selected] : 0} votes</p>
			<button onClick={() => handleVote(selected)}>vote</button>
			<button onClick={() => handleNext(selected)}>next anecdote</button>
			<br />

			<h1>Anecdote with most votes</h1>
			{votes.length > 0 && (
				<p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
			)}
			{votes.length > 0 && <p>has {Math.max(...votes)} votes</p>}
		</>
	)
}

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
