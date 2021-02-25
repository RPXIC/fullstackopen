import anecdoteService from '../services/anecdotes'

const sortedByVotes = arr =>
  arr.sort((a, b) => (a.votes < b.votes ? 1 : b.votes < a.votes ? -1 : 0))

const anecdoteReducer = (state = [], action) => {
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

    case 'INIT_ANECDOTES':
      return sortedByVotes(action.data)

    case 'ADD_ANECDOTE':
      const addedAnecdote = [...state, action.data]
      return sortedByVotes(addedAnecdote)

    default:
      return sortedByVotes(state)
  }
}

export const addVote = anecdote => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(anecdote)
    dispatch({
      type: 'ADD_VOTE',
      data: {
        id: anecdote.id,
      },
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const addAnecdote = data => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export default anecdoteReducer
