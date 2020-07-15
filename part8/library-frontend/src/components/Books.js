import React, {useState, useEffect} from 'react'
import { ALL_BOOKS  } from '../queries'
import {  useApolloClient } from '@apollo/client';

const Books = (props) => {
const[filter, setFilter] = useState('all')
const [genre, setGenre] = useState(null);
const [filteredBooks, setFilteredBooks] = useState([])
const client = useApolloClient(ALL_BOOKS)

useEffect(() => {
  const setBooks = async genre => {
    const { data } = await client.query({
      query: ALL_BOOKS,
      variables: genre ? { genre: genre } : {}
    })
    setFilteredBooks(data.allBooks)
  }
  setBooks(genre)
}, [ client, genre])

//const books = props.books
const thisFilter = (filter) => {
   return (
     <div>
       in genre <b>{filter}</b>
     </div>
   )
 }

 let genres = filteredBooks.map(b => b.genres).map(item => item)
  function removeDups(genres) {
    let unique = {};
    genres.forEach(function(i) {
      if(!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique)
  }
  
genres = removeDups(genres)
  if (!props.show) {
    return null
  }

  let booksToShow
  if (filter !== 'all') {
   booksToShow= filteredBooks.filter(b => b.genres.includes(filter))

  } else {
    booksToShow = filteredBooks
  }

  return (
    <div>
      <h2>Books:</h2> 
      {genres.map(item => <button key={item} onClick={() => setFilter(item)}>
        {item}
      </button>)}
      <button type="button" onClick={() => setFilter('all')}>all</button>
      {thisFilter(filter)}
      <table>
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
          {booksToShow.map((a,i) =>
            <tr key={a.title}>
               <td>{i + 1}</td>
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