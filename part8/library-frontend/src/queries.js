import { gql  } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author{
      name
      born
    }
    published
    genres
  }
` 
export const ALL_BOOKS = gql`
query allBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    author{
      name
      born
    }
    published
    genres
  }
}
`
export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
    id
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String, $published: Int!, $genres: [String]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  

  ) {
    title
    published
    genres
    author {
      name
    }
  }
}
`
export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born)  {
      name
      born
      bookCount
      id
    }
  }
`
export const ME = gql`
query {
  me {
    favoriteGenre
  }
}
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_BY_GENRE = gql`
query findbooksByGenre ($genre: String!) {
  allBooks (genre: $genre) {
    title
    author {
      name
    }
    published
  }
}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
/* export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author{
        name
      }
      published
      genres
    }
  }
` */

