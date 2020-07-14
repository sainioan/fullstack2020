import React from 'react'
//import { ME } from '../queries'
//import {  useQuery} from '@apollo/client'

const Recommendations = (props) => {
    
    const books = props.books

 
  const user = props.user
  console.log(user)
 /*     const { data: user} = useQuery(ME, {
        skip: !props.show, 
      })  
     */
     if (!user){
          return null
      }

    const favoriteGenre =  user.favoriteGenre
    
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