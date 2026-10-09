const Book = require('./models/book')
const Author = require('./models/author')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre) {
        return Book.find({})
      }
      return Book.find({
        genres: args.genre
      })
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: ({ name }) => {
      booksByAuthor = books.filter((book) => book.author === name)
      return booksByAuthor.length
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }
      const newBook = new Book({ ...args, author: author })
      return newBook.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      return author.save()
    },
  },
}

module.exports = resolvers