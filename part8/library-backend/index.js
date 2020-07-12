const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const User = require('./models/user')
const Book = require('./models/book')
require('dotenv').config();
mongoose.set('useFindAndModify', false)
MONGODB_URI=process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)
mongoose.set('useCreateIndex', true)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const { v1: uuid } = require('uuid')

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
    author: Author
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
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String
      id: ID
      genres: [String]
    ): Book      
    editAuthor(
      name: String!
      born:Int!   
    ): Author    
  }  
`

const resolvers = {
  Query: {
   // bookCount: () => books.length,
   bookCount: () => Book.collection.countDocuments(),
   authorCount:() => Author.collection.countDocuments(),
  //  authorCount: () => authors.length,
    allBooks: (root, args) => {
  
      if(args.author && args.genre){
       const byGenre =  books.filter(b => b.genres.includes(args.genre))
        return byGenre.filter(b => b.author ===args.author)
      } if((!args.author) && args.genre){
       return  books.filter(b => b.genres.includes(args.genre))
       } if((!args.genre) && args.author){
         return books.filter(b => b.author ===args.author)
        }
        return Book.find({}).populate('author')
      }
    
        ,
        allAuthors: (root, args) => {
          return Author.find({}).populate('book')
        } 
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      const booksByAuthor = await Book.find({ author: author.id})
      return  booksByAuthor.length
    }
  },  
Mutation: {
  addBook: async (root, args) => {
 
    let author = await Author.findOne({ name: args.author })

    if (author === null) {
      author = await new Author({...args.author,
        name: args.author,
        bookCount: 1,
      })
     await author.save()
    }
    const book = new Book({ ...args, author: author })
    const newBook = await book.save()
    return newBook
  }, 
editAuthor: async (root, args) => {
const author = await Author.findOne({name:args.name})
author.born = args.born
return author.save()

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