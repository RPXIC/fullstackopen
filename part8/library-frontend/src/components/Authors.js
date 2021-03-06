import React from 'react'
import { AUTHORS } from '../queries'
import { useQuery } from '@apollo/client'
import SetBirthYear from './SetBirthYear'

const Authors = props => {
  const res = useQuery(AUTHORS)

  if (!props.show) return null

  if (res.loading) return <div>loading...</div>

  const authors = res.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthYear authors={authors} />
    </div>
  )
}

export default Authors
