import { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import Notify from './components/Notify'
import { ALL_AUTHORS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [errorMessage, setErrorMessage] = useState(null)
  const authorResult = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  if (authorResult.loading) {
    return <div>loading...</div>
  }

  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    if (page === 'add' || page === 'recommend') {
      setPage('authors')
    }
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={onLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}

      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        authors={authorResult.loading ? [] : authorResult.data.allAuthors}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook show={page === 'add'} />
      <Recommendations
        show={page === 'recommend'}
      />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        setError={notify}
      />
    </div>
  )
}

export default App
