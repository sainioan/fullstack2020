import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case 'VOTE':

      const previous = state.filter(a => a.id !==action.id)
      const addVote = state.find(a => a.id === action.id)
  
      return [...previous, { ...addVote, votes: addVote.votes + 1 } ]
    case 'ADD':
    return [...state, action.data] 
    case 'INIT_ANECDOTES':
      return action.data
  default: return state 
  }
  
}
export const initializeAnecdotes = () => {
  return async dispatch => {
   const anecdotes =  await anecdotesService.getAll()
   dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  })
}
}
export const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const addVote = anecdote => {

  const anecdotes = { ...anecdote, votes: anecdote.votes + 1 }
  return async dispatch => {
    const newVote = await anecdotesService.update(anecdotes)
    dispatch({
      type: 'VOTE',
      id: anecdote.id,

    })
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote,
    })
  }
}

export default reducer