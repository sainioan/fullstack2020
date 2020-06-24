import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux' 
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'




const App = (props) => {
  useEffect(() => {
    props.initializeAnecdotes()
  }, [])

/*   const App = () => {

      const dispatch = useDispatch() */
 /*      useEffect(() => {
        anecdoteService
          .getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
      }, [dispatch]) */
      // useEffect(() => {
/*         dispatch(initializeAnecdotes())  
      },[dispatch])  */

  return (
    <div>
     <Notification />
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)
//export default App