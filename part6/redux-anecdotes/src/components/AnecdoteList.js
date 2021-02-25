import React from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const handleClick = anecdote => {
    props.addVote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {props.anecdotes.map(anecdote => (
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

const mapStateToProps = state => {
  if (state.filter !== '') {
    return {
      anecdotes: state.anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      ),
    }
  }
  return {
    anecdotes: state.anecdotes,
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification,
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdotes
