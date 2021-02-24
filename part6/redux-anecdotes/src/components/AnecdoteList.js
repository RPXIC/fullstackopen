import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Filter from './Filter'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter !== '') {
      return anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
    }
    return anecdotes
  })
  const dispatch = useDispatch()

  const handleClick = anecdote => {
    dispatch(addVote(anecdote.id))
    dispatch(addNotification(`Voted ${anecdote.content}`))
    setTimeout(() => dispatch(addNotification('')), 5000)
  }

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleClick(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
