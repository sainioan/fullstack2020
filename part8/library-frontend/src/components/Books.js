import React, {useState} from 'react'




const Books = (props) => {
  const[filter, setFilter] = useState('all')
  const books = props.books
 
 let genres = books.map(b => b.genres).map(item => item)
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
      <button type = "button" onClick={() =>  setFilter('all')}>all</button>
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
          in genre <b>{filter}</b>
          <p></p>
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