  
import React, { useState } from 'react'
import Select from 'react-select'
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from '../queries'
import { useMutation, useQuery  } from '@apollo/client'


const Authors = (props) => {


 //const authors = props.authors
 const [name, setName] = useState('')
 const [born, setBorn] = useState('')

/*  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
  refetchQueries: [ {query: ALL_AUTHORS}, { query:ALL_BOOKS} ],
  onError: (error) => {
    if(error.graphQLErrors.length > 0) {
      props.setError(error.graphQLErrors[0].message)
    } else {
      console.log(error)
    }
  }
}) */
const [editAuthor] = useMutation(EDIT_AUTHOR)
const result = useQuery(ALL_AUTHORS)
let authors
if (result.loading) {
  return <div>loading...</div>
}
authors = result.data.allAuthors
/* const options = []
  authors.forEach(a => options.push({ value: a.name, label: a.name }))
 */  
/* const options = []
  Object.entries(authors).forEach(([key, value]) => {
    options.push({value: value.name, label: value.name})
  })
 */
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
      <h2>set birth year</h2>
 {/*      <form onSubmit={submit}>
        Name:{' '}
        <Select
          options={options}
          value = {name}
          onChange={setName}
          autoFocus
          isSearchable
          placeholder="Search author"
        />
        SetBorn:{" "}
        <input
        type = 'text'
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
        <button type="submit">Update Author</button>
      </form>
   {/*  */}   
   <form onSubmit={submit}>
        <div>
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
        <button type='submit'>set</button>
      </form> 
   {/*    <h3>Set birthyear</h3>
          <form onSubmit={submit}>
            <div>
              name 
              <select value={name} onChange={(e) => setName(e.target.value)}>
                <option value='none'>Select author</option>
                {authors.map(a =>
                  <option key={a.id} value={a.name}>{a.name}</option>
                )}
              </select>
              
            </div>
            <div>
              born <input type='text' value={born} onChange={(e) => setBorn(e.target.value)}/>
            </div>
            <button type='submit'>update author</button>
          </form> */}
    </div>
  )
}

export default Authors
