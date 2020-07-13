import React from 'react'
import { ME } from '../queries'
import {  useQuery} from '@apollo/client'
const filteredBooks = ({filter, books}) =>{
  return books.filter(b => b.genres.includes(filter))
}


const Books = (props) => {

  const books = props.books
  const { data: user } = useQuery(ME, {
    skip: !props.show, 
  }) 
  if(user){
    console.log(user)
    console.log(user.me.favoriteGenre)
 // const favoriteGenre = user.data.favoriteGenre
 // console.log(favoriteGenre)
  }
  if (!props.show) {
    return null
  }
/*   const { data: books } = useQuery(FIND_BOOK, {
    skip: !me || !me.favoriteGenre,
    fetchPolicy: 'cache-and-network',
    variables: { genreToSearch: me ? me.favoriteGenre : null },
  }); */


  return (
    <div>
      <h2>Books:</h2>

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
          {books.map(a =>
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