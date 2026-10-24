import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState('')

  /*const booksToShow = genre
    ? books.filter((book) => book.genres.includes(genre))
    : books */

  const genreResult = useQuery(ALL_GENRES, {
    skip: !show,
  })

  const bookResult = useQuery(ALL_BOOKS, {
    skip: !show,
    variables: genre ? { genre } : {},
  })

  if (!show) {
    return null
  }

  if (bookResult.loading) {
    return <div>loading...</div>
  }

  const genres = [
    ... new Set((genreResult.data.allBooks).flatMap((book) => book.genres))
  ]
  const booksToShow = bookResult.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <div>In {genre ? <>genre <b>{genre}</b></> : <b>all genres</b>}</div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => setGenre(genre)}
        >
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books
