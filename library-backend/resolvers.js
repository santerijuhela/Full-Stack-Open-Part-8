const Book = require('./models/book')
const Author = require('./models/author')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      /*const byAuthor = (book) => {
        if (!args.author) {
          return true
        }
        return book.author === args.author
      }
      const byGenre = (book) => {
        if (!args.genre) {
          return true
        }
        return book.genres.includes(args.genre)
      }
      return books.filter((book) => byAuthor(book) && byGenre(book))*/
      return Book.find({})
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
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name)
      if (!author) {
        return null
      }

      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a))
      return updatedAuthor
    },
  },
}

module.exports = resolvers