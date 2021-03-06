  
import React, { useState } from 'react'
import Select from 'react-select'
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from '../queries'
import { useMutation, useQuery  } from '@apollo/client'


const Authors = (props) => {


 const [name, setName] = useState('')
 const [born, setBorn] = useState('')

 const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
  refetchQueries: [ {query: ALL_AUTHORS}, { query:ALL_BOOKS} ],
  onError: (error) => {
    if(error.graphQLErrors.length > 0) {
      props.setError(error.graphQLErrors[0].message)
    } else {
      console.log(error)
    }
  }
}) 
const result = useQuery(ALL_AUTHORS)
let authors
if (result.loading) {
  return <div>loading...</div>
}
authors = result.data.allAuthors

  let options = []
  const authorList = authors.map((author) => author.name)

  authorList.forEach((author) =>
    options.push({ value: author, label: author })
  )


if (!props.show) {
  return null
} 

const submit = async (event) => {
  event.preventDefault()
 // await editAuthor({ variables: { name: name, born: parseInt(born) } })
await editAuthor({ variables: { name: name.value, born: parseInt(born) } })
  console.log(born)
  setName('')
  setBorn('')
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
      <h2>Set birth year</h2>
   <form onSubmit={submit}>
        <div>
          Name 
{/*           <input
          value ={name}
          onChange = {({target}) => setName(target.value)}
          /> */}
          <Select
            value={name}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          year
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>Update author</button>
      </form> 
    </div>
  )
}

export default Authors
