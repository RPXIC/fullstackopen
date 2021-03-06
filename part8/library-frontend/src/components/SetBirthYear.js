import React, { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, AUTHORS } from '../queries'

const SetBirthYear = ({ authors }) => {
  const [selected, setSelected] = useState('')
  const [born, setBorn] = useState('')
  const options = authors.map(author => ({
    value: author.name,
    label: author.name,
  }))

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: AUTHORS }],
    onError: error => {
      console.log(error)
    },
  })

  const handleSubmit = e => {
    e.preventDefault()
    editAuthor({ variables: { name: selected, setBornTo: born } })
  }

  return (
    <>
      <h3>set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <Select
          options={options}
          placeholder='Select author...'
          onChange={e => setSelected(e.value)}
        />
        <span>Born: </span>
        <input
          type='number'
          name='born'
          value={born}
          onChange={({ target }) => setBorn(Number(target.value))}
        />
        <br />
        <button>update author</button>
      </form>
    </>
  )
}

export default SetBirthYear
