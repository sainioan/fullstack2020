import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Anecdote = (props) => 
<div>
  <h1>{props.title}</h1>
  {anecdotes[props.index]}
  <br/> has {props.votes[props.index]} votes 
</div>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = (props) => {
const[selected, setSelected] = useState(0)
const[votes, setVotes] = useState(new Array(anecdotes.length+2).join('0').split('').map(parseFloat))

  const handleVoteCount = () => {
    const copy = [...votes]

    copy[selected] += 1
    setVotes(copy)

  }
  const maxVotes = votes.indexOf(Math.max(...votes))
  const handleClick = ({selected}) => {
        setSelected(selected[Math.floor(Math.random()*selected.length)]);
       }
  
 
 return (
    <div>
      <Anecdote title='Anecdote of the day' index={selected} votes={votes} />
      <Button
          handleClick={() => handleVoteCount()}
          text='vote'/>
      <Button
        handleClick={() => setSelected(Math.floor(Math.random() * (anecdotes.length)))}
        text='next anecdote'/>
        <Anecdote title='Anecdote with most votes' index={maxVotes} votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
