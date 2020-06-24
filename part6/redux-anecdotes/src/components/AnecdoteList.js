import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
import { addVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
const AnecdoteList = () => {


  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))  
})
    const vote = (id) => {
     const anecdote =  anecdotes.find(a => a.id === id)
    console.log('vote', id)
  /*   dispatch({
      type: 'VOTE',
      data: { id }
    }) */
    dispatch(addVote(anecdote))

    dispatch(notify(`anecdote ${anecdote.content} voted`,5))
    setTimeout(() => {
      dispatch(notify(null))
      }, 5000) 
  }
  return(
    <div>
    <ul>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </ul>
    </div>
  )
}


export default AnecdoteList