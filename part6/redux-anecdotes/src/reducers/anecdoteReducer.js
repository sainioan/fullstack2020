import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case 'VOTE':
      const anecdote = state.find(anecdote => anecdote.id === action.data.id)
      const voted_anecdote = {...anecdote, votes: anecdote.votes +1}
    return state.map(anecdote => anecdote.id!== action.data.id? anecdote: voted_anecdote )
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

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote,
    })
  }
}
/* export const createAnecdote = (data) => {
  return {
    type: 'ADD',
    data,
  }
} */

export default reducer