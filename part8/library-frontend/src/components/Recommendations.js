import React, { useEffect } from 'react'
import { USER, ALL_BOOKS } from '../queries'
import { useQuery, useLazyQuery } from '@apollo/client'

const Recommendations = props => {
  const res = useQuery(USER)
  const [getFav, { loading: loading2, data: data2 }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (res.data)
      getFav({ variables: { filterByGenre: res.data.me.favoriteGenre } })
  }, [res, getFav])

  if (!props.show) return null
  if (res.loading || loading2) return <div>loading...</div>

  return (
    <>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{res.data.me.favoriteGenre}</b>
      </p>
      {data2 && data2.allBooks && (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {data2.allBooks.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
export default Recommendations
