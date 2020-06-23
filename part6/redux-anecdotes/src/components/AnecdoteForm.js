
import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
//import notification from './Notification'
import Notification from './Notification'
import { notify, clear } from '../reducers/notificationReducer'
import store from '../store.js'

let nextId = 0;
const makeNotification = (text) => {
  const id = nextId++;
  return {
    id, text
  };
}

export function showNotification(text) {
  const notification = makeNotification(text);
  return { type: 'SET_NOTIFICATION', payload: notification };
}
export function hideNotification(id) {
  return { type: 'HIDE_NOTIFICATION', payload: id };
}
export function showNotificationWithTimeout(text) {
  return function (dispatch) {
    const notification = makeNotification(text);
    dispatch({ type: 'SET_NOTIFICATION', payload: notification });
    setTimeout(() => dispatch(hideNotification(notification.id)), 1000)
  }
}
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