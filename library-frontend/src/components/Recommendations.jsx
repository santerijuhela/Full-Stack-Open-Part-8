import { useQuery } from '@apollo/client/react'
import { CURRENT_USER } from '../queries'

const Recommendations = ({ show, books }) => {
    const userResult = useQuery(CURRENT_USER, {
        skip: !show,
    })

    if (!show) {
        return null
    }

    if (userResult.loading) {
        return <div>loading...</div>
    }

    const favoriteGenre = userResult.data.me.favoriteGenre
    const booksToShow = books.filter((book) => book.genres.includes(favoriteGenre))

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