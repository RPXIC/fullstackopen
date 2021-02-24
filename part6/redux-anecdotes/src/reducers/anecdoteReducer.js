const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const sortedByVotes = arr =>
  arr.sort((a, b) => (a.votes < b.votes ? 1 : b.votes < a.votes ? -1 : 0))

const initialState = sortedByVotes(anecdotesAtStart.map(asObject))

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_VOTE':
      const id = action.data.id
      const anecdoteToAddVote = state.find(n => n.id === id)
      const anecdoteVoted = {
        ...anecdoteToAddVote,
        votes: anecdoteToAddVote.votes + 1,
      }
      const addedAnecdoteVoted = state.map(anecdote =>
        anecdote.id !== id ? anecdote : anecdoteVoted
      )
      return sortedByVotes(addedAnecdoteVoted)

    case 'ADD_ANECDOTE':
      const addedAnecdote = [...state, asObject(action.data.anecdote)]
      return sortedByVotes(addedAnecdote)
    default:
      return sortedByVotes(state)
  }
}

export const addVote = id => {
  return {
    type: 'ADD_VOTE',
    data: {
      id,
    },
  }
}

export const addAnecdote = anecdote => {
  return {
    type: 'ADD_ANECDOTE',
    data: {
      anecdote,
    },
  }
}

export default anecdoteReducer
