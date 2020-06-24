import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

const vote = (anecdote) => {

 props.addVote(anecdote)
 
 props.notify(`anecdote ${anecdote.content} voted`,10)
 const timeout1 = setTimeout(() => {
   props.notify(null)
   }, 5000) 
   clearTimeout(timeout1 -1) 
}

  return(
    <div>
    <ul>
        {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  const anecdotes = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
  return {
    anecdotes
  }
}
export default connect(mapStateToProps, { addVote, notify })(AnecdoteList)