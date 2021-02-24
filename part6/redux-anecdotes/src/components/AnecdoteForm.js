import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addAnecdote(e.target.anecdote.value))
    dispatch(addNotification(`Added ${e.target.anecdote.value}`))
    e.target.anecdote.value = ''
    setTimeout(() => dispatch(addNotification('')), 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
