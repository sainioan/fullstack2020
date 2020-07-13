
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import {  useQuery,  useApolloClient } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, BOOK_COUNT }  from './queries.js'


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
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const resultAuthors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const resultBooks = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  const [page, setPage] = useState('authors')
  const res = useQuery(BOOK_COUNT)
  let totalBooks
  if(res.data) {
  totalBooks = res.data.bookCount
  }
  if (resultAuthors.loading)  {
    return <div>loading authors...</div>
  }
  if (resultBooks.loading)  {
    return <div>loading books...</div>
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

 
  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={logout} >logout</button>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors authors = {resultAuthors.data.allAuthors}
        show={page === 'authors'}
        notify={notify}
        setError={notify}
      />

      <Books books = {resultBooks.data.allBooks}
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