import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, BOOK_ADDED, ALL_BOOKS } from '../queries'
import { useSubscription, useApolloClient } from '@apollo/client';
const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const client = useApolloClient()
  const [ createBook ] = useMutation(CREATE_BOOK, {
    //refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS} ],
    onError: (error) => {
      if(error.graphQLErrors.length > 0) {
        props.setError(error.graphQLErrors[0].message)
      } 
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })
  
  useSubscription(BOOK_ADDED,{
    onSubscriptionData: ({subscriptionData }) => {
      console.log(subscriptionData);
      const bookAdded = subscriptionData.data.bookAdded
     // window.alert(`${bookAdded.title} was added!`)
      updateCacheWith(bookAdded)
    }
  })
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      const newData = [...dataInStore.allBooks, addedBook]
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: newData
        }
      })
    }   
  }
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('add book...')
    createBook({  variables: { title, published, author, genres, genre } })
    setTitle('')
    setPublished('')
    setAuthor('')
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
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook