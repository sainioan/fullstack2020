import React, { useState, useEffect } from 'react'
//import { ME } from '../queries'
import {  useLazyQuery} from '@apollo/client'
import { ALL_BOOKS  } from '../queries'




const Recommendations = (props) => {

  const user = props.user
  let favoriteGenre 
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])


  useEffect(() => {
    getBooks({ variables: { genre: favoriteGenre }})
  }, [getBooks, favoriteGenre])

  useEffect(() => {
    if(result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])
  if(!user){
    return null
  }
  favoriteGenre =  user.favoriteGenre
  //  const books = props.books

 /*     const { data: user} = useQuery(ME, {
        skip: !props.show, 
      })  
     */
    
     const filteredBooks = books.filter((book)=> book.genres.includes(favoriteGenre))
     if (!props.show) {
      return null
    } 

   // if (!favoriteGenre) return null
     return(
        <div>
         <h3>recommendations</h3>
       <p>books in your favorite genre <b>{favoriteGenre}</b></p> 
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
           {filteredBooks.map(a =>
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

export default Recommendations