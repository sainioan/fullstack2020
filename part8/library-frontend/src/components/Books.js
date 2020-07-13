import React, {useState} from 'react'
import { ME } from '../queries'
import {  useQuery} from '@apollo/client'



const Books = (props) => {
  const[filter, setFilter] = useState('')
  const books = props.books
 
 let genres = books.map(b => b.genres).map(item => item)
  function removeDups(genres) {
    let unique = {};
    genres.forEach(function(i) {
      if(!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }
  
genres = removeDups(genres)
  if (!props.show) {
    return null
  }
  const filteredBooks = ({filter}) =>{
    return books.filter(b => b.genres.includes(filter))
  }
  let booksToShow
  if (filter !== '') {
   booksToShow= books.filter(b => b.genres.includes(filter))
  } else {
    booksToShow = books
  }
  return (
    <div>
      <h2>Books:</h2>
      {  genres.map(item => <button key={item} onClick={() =>  setFilter(item)}>
        {item}
      </button>)}

      <table  style={{ marginTop: '16px'}}>
        <tbody>
          <tr>
            <th>
            Title
            </th>
            <th>
            Author
            </th>
            <th>
            Published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books