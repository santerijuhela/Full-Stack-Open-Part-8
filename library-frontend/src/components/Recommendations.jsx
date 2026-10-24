import { useQuery } from '@apollo/client/react'
import { CURRENT_USER, ALL_BOOKS } from '../queries'

const Recommendations = ({ show }) => {
    const userResult = useQuery(CURRENT_USER, {
      skip: !show,
    })
    const favoriteGenre = userResult.data?.me?.favoriteGenre

    const bookResult = useQuery(ALL_BOOKS, {
      skip: !show,
      variables: { genre: favoriteGenre }
    })

    if (userResult.loading || bookResult.loading) {
      return <div>loading...</div>
    }

    const booksToShow = bookResult.data?.allBooks

    if (!show) {
      return null
    }

    return (
      <div>
        <h2>recommendations</h2>
        <div>books in your favorite genre <b>{favoriteGenre}</b></div>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksToShow.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}

export default Recommendations