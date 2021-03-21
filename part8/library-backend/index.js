const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require('apollo-server')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET
const MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connection to MongoDB:', error.message))

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type AddBook {
    title: String!
    author: String!
  }

  type EditAuthor {
    name: String
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(filterByGenre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): AddBook!
    editAuthor(name: String!, setBornTo: Int!): EditAuthor
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.filterByGenre) {
        return await Book.find({
          genres: args.filterByGenre,
        }).populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: async (root, args) => {
      const authors = await Author.find({})
      const books = await Book.find({}).populate('author')

      const countOccurrences = (arr, val) =>
        arr.reduce((a, v) => (v.author.name === val ? a + 1 : a), 0)

      const authorsWithBookCount = authors.map(author => ({
        name: author.name,
        bookCount: countOccurrences(books, author.name),
        born: author.born,
        id: author.id,
      }))
      return authorsWithBookCount
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) throw new AuthenticationError('not authenticated')

      const authorExist = await Author.findOne({ name: args.author })
      if (!authorExist) {
        try {
          const author = new Author({ name: args.author })
          await author.save()
          const book = new Book({ ...args, author: author._id })
          await book.save()
          const bookWithAuthor = await Book.findById(book._id).populate(
            'author'
          )
          pubsub.publish('BOOK_ADDED', { bookAdded: bookWithAuthor })
          return book
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      try {
        const book = new Book({ ...args, author: authorExist._id })
        await book.save()
        const bookWithAuthor = await Book.findById(book._id).populate('author')
        pubsub.publish('BOOK_ADDED', { bookAdded: bookWithAuthor })
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) throw new AuthenticationError('not authenticated')
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      return await author.save()
    },
    createUser: (root, args) => {
      const user = new User({ ...args })

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secred') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
