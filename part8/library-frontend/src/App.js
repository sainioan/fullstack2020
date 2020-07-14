
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import {  useQuery,  useSubscription, useApolloClient } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED }  from './queries.js'


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
  const [page, setPage] = useState('authors')
  const resultAuthors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const resultBooks = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  const resultMe = useQuery(ME, {
    pollInterval:2000
  })
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {

      const addedBook = subscriptionData.data.bookAdded
      console.log(subscriptionData)

      window.alert(`${subscriptionData.data.bookAdded.title} was added`)
      updateCacheWith(addedBook)
    }
  })
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])

  if (resultAuthors.loading)  {
    return <div>loading authors...</div>
  }
  if (resultBooks.loading)  {
    return <div>loading books...</div>
  }
  if (resultMe.loading)  {
    return <div>loading user...</div>
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
        <button onClick={() => setPage('recommendations')}>recommend</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors authors = {resultAuthors.data.allAuthors}
        show={page === 'authors'}
        token={token}
        notify={notify}
        setError={notify}
      />

      <Books books = {resultBooks.data.allBooks}
        show={page === 'books'}
      />

      <NewBook 
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
        token={token}
        setError={notify}
      />

      <Recommendations
      books = {resultBooks.data.allBooks}
      user = {resultMe.data.me}
      show ={page ==='recommendations'}
      />

    </div>
  )
}

export default App