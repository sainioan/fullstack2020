import React from 'react'
import { connect } from 'react-redux' 
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'


  const AnecdoteForm = (props) => {


  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''      

  props.createAnecdote(content)
  props.notify(`anecdote '${content}' created`, 10)
  const timeout1 = setTimeout(() => {
    props.notify(null)
    }, 5000) 
    clearTimeout(timeout1 - 1) 
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

export default connect(null, { createAnecdote, notify}) (AnecdoteForm)
