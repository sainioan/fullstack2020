import React from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux' 
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

//const AnecdoteForm = () => {
  //const dispatch = useDispatch()
  const AnecdoteForm = (props) => {
 //   const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''      
  //  dispatch(createAnecdote(content))
  props.createAnecdote(content)
  props.notify(`you voted '${content}'`, 10)
  setTimeout(() => {
    props.notify(null)
    }, 5000) 
  }
  //  dispatch(notify(`you voted '${content}'`, 10))
  /*    setTimeout(() => {
    dispatch(notify(null))
    }, 5000) 
  } */

  
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
//export default AnecdoteForm