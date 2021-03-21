import React, { useState } from 'react'
import { useMutation, useApolloClient, useSubscription } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, AUTHORS, BOOK_ADDED } from '../queries'

const NewBook = props => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const client = useApolloClient()

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) =>
      set.map(p => p.title).includes(object.title)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`book ${addedBook.title} added`)
      updateCacheWith(addedBook)
    },
  })

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: AUTHORS }],
    onError: error => {
      console.log(error)
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    },
  })

  if (!props.show) return null

  const submit = async event => {
    event.preventDefault()
    addBook({ variables: { title, author, published, genres } })
    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
