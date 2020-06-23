import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

/* 
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
) */

const store = () => {
  const reducer = combineReducers({
      anecdotes: anecdoteReducer,
      filter: filterReducer,
      notification: notificationReducer
  })
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
  return store
}

export default store