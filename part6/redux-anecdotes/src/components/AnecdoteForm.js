
import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
//import notification from './Notification'
import { notify, clear } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
   
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''      


    dispatch(createAnecdote(content))

    dispatch(notify(`you created anecdote ${content}`))
    setTimeout(() => { dispatch(clear()) }, 5000)
  }

  return(
    <div>
<h2>create new</h2>
<form onSubmit={addAnecdote}>
  <div><input name = 'anecdote' /></div>
  <button type = 'submit'>create</button>
</form>
</div>
)

}

export default AnecdoteForm