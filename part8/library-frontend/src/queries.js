import { gql  } from '@apollo/client'

export const ALL_BOOKS = gql`
query {
  allBooks  {
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
export const BOOK_COUNT = gql`
  query {
    bookCount
  }`


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
    username
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
