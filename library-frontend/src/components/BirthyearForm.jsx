import { useState } from 'react'
import { useMutation } from '@apollo/client/react'

import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'

const BirthyearForm = ({ authorList }) => {
  const [name, setName] = useState(authorList[0].name)
  const [born, setBorn] = useState('')

  const [setBirthyear] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    setBirthyear({ variables: { name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <label>
            name
            <select
              value={name}
              onChange={({ target }) => setName(target.value)}
            >
              {authorList.map(author => (
                <option key={author.id} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </label>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BirthyearForm