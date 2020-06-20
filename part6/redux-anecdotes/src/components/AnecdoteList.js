import PropTypes from 'prop-types'
//import Anecdote from './AnecdoteItem'

const AnecdoteList = ({ filteredAnecdotes, actions }) => (
  <ul className="anecdote-list">
  {/*   {filteredAnecdote.map(todo =>
      <Anecdote key={anecdote.id} anecdote={anecdote} {...actions} /> */}
    )}
  </ul>
)

AnecdoteList.propTypes = {
  filteredTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  actions: PropTypes.object.isRequired
}

export default AnecdoteList