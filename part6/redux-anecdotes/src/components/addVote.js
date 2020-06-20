import React from 'react'
import { useDispatch } from 'react-redux'


const NewVote = (props) => {
  const dispatch = useDispatch()

  const vote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
   dispatch((content))
  }

  return (
   <div></div>
  )
}

export default NewVote