import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = props => {
  const [filter, setFilter] = useState(false)
  const res = useQuery(ALL_BOOKS)

  if (!props.show) return null

  if (res.loading) return <div>loading...</div>

  let allGenres = []
  res.data.allBooks.forEach(({ genres }) => {
    genres.forEach(genre => !allGenres.includes(genre) && allGenres.push(genre))
  })

  const books =
    filter === false
      ? res.data.allBooks
      : res.data.allBooks.filter(book => book.genres.includes(filter))

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.map((el, i) => (
        <button key={i} onClick={() => setFilter(el)}>
          {el}
        </button>
      ))}
      <button onClick={() => setFilter(false)}>all genres</button>
    </div>
  )
}

export default Books
