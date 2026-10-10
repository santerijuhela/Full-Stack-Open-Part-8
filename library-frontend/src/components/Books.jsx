import { useState } from 'react'

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState('')
  const genres = [...new Set(books.flatMap((book) => book.genres))]

  const booksToShow = genre
    ? books.filter((book) => book.genres.includes(genre))
    : books

  if (!show) {
    return null
  }

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
