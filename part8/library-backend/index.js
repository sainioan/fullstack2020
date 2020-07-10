
  
const { ApolloServer, gql } = require('apollo-server')
const { v4: uuidv4, v4 } = require('uuid');
uuidv4()

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]


let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
type Book {
    title: String!
    published: Int!
    author: String!
    id: ID
    genres: [String]
    genre: String
  }
  type Author {
    name: String!
    bookCount: Int
    born:Int
    id: ID
  }
  enum YesNo {
    YES
    NO
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks (author:String, genre:String):[Book]
    allAuthors: [Author]
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      id: ID
      genres: [String]
    ): Book      editAuthor(
      name: String!
      born:Int!   
    ): Author    
  }  
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
  
      if(args.author && args.genre){
       const byGenre =  books.filter(b => b.genres.includes(args.genre))
        return byGenre.filter(b => b.author ===args.author)
      } if((!args.author) && args.genre){
       return  books.filter(b => b.genres.includes(args.genre))
       } if((!args.genre) && args.author){
         return books.filter(b => b.author ===args.author)
        }
        return books
      }
    
        ,
        allAuthors: (root, args) => {
          return authors
        } 
  },
  Author: {
    bookCount: (root) => books.filter(b => b.author === root.name).length
    
  }
,
Mutation:{
  addBook: (root, args) => {
    const book = { ...args, id: v4 }
    console.log(book)
    console.log(book.author)
    books = books.concat(book)
   authors = authors.concat({ name: book.author, id: v4})
    console.log(authors)
    console.log(books)
  //  const author =  { ...args.author, id: v4 }
    //authors = authors.concat(args.author)
    return book
  }, editAuthor: (root, args) => {
    const author = authors.find(a => a.name === args.name)
    if (!author) {
      return null
    }

    const updatedAuthor = { ...author, born: args.setBornTo }
    authors = authors.map(a => a.name === args.author ? updatedAuthor : a)
    return updatedAuthor
}
}
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})