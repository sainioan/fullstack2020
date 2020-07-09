
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {  useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, CREATE_BOOK, ALL_BOOKS }  from './queries.js'


const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}
const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_AUTHORS, ALL_BOOKS, {
    pollInterval: 2000
  })

  const [page, setPage] = useState('authors', 'books')

  if (result.loading)  {
    return <div>loading...</div>
  }


  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }




  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors authors = {result.data.allAuthors}
        show={page === 'authors'}
      />

      <Books books = {result.data.allBooks}
        show={page === 'books'}
      />

      <NewBook 
        show={page === 'add'}
        setError={notify}
      />

    </div>
  )
}

export default App