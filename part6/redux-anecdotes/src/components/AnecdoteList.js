import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
const AnecdoteList = () => {


  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)


  const vote = (id) => {
    console.log('vote', id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
  
  return(
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
  )
}


export default AnecdoteList