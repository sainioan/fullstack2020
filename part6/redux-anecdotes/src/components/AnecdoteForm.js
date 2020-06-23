import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
   
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''      
    dispatch(createAnecdote(content))
    dispatch(notify(`you created anecdote ${content}`))
    setTimeout(() => {
    dispatch(notify(null))
    }, 5000)
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