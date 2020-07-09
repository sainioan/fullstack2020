  
import React from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'
const Authors = (props) => {


 const authors = props.authors
/*  const [ createBook ] = useMutation(CREATE_BOOK, {
  refetchQueries: [ { query: ALL_AUTHORS } ],
  onError: (error) => {
    props.setError(error.graphQLErrors[0].message)
  }
}) */
if (!props.show) {
  return null
} 
console.log(authors)
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors
