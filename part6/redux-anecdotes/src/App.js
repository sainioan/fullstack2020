import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/anecdoteReducer'
import newVote from './components/addVote.js'
/* const sortedAnecdotes = anecdotes.sort((a, b) => {
  return b.votes - a.votes
}) */
const handleVotes = () => {
  // tally vote to anecdote in array
/*   const copy = [...allPoints]
  copy[selected] += 1
  setPoints(copy)

  console.log(copy[selected]); */
}

const store = createStore(reducer)

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
/*   const NewVote = (props) => {
    const dispatch = useDispatch()
  
    const vote = (event) => {
      event.preventDefault()
      const content = event.target.note.value
      event.target.note.value = ''
     dispatch((content))
    } */

/*     const vote/like = (anecdote) => {
      dispatch(voteAction(anecdote.id))
      //dispatch(notificationAction(`You hit Like on ${anecdote.content}`))

      const timeoutId = setTimeout(() => {
          dispatch(emptyAction())
      }, 5000)

      clearTimeout(timeoutId - 1)
  } */
    const vote = (id) => {
      console.log('vote', id)
      dispatch({
        type: 'VOTE',
        data: { id }
      })
    }
    const createAnecdote = (content) => {
      return {
        type: 'ADD',
        data: {
          content,
        //  id: generateId()
        }
      }
    }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}


export default App