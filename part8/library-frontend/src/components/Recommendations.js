import React, { useEffect } from 'react'
import { USER, ALL_BOOKS } from '../queries'
import { useLazyQuery } from '@apollo/client'

const Recommendations = ({ show, token }) => {
  const [getUser, { loading: loadingUser, data: userRes }] = useLazyQuery(USER)
  const [getFav, { loading: loadingFavs, data: favs }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (token && !userRes) getUser()
    if (token && userRes && !favs) {
      getFav({ variables: { filterByGenre: userRes.me.favoriteGenre } })
    }
  }, [token, getUser, userRes, getFav, favs])

  if (!show) return null
  if (loadingUser || loadingFavs) return <div>loading...</div>

  return (
    <>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{userRes.me.favoriteGenre}</b>
      </p>
      {favs && favs.allBooks && (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {favs.allBooks.map(a => (
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
