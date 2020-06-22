import React from 'react'
import { useHistory } from 'react-router-dom'
import  { useField } from '../hooks'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    
    const history = useHistory()
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      history.push('/anecdotes')
    }

    const handleReset = (e) => {
      e.preventDefault()
      content.onChange(e)
      author.onChange(e)
      info.onChange(e)
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button onClick={handleSubmit}>create</button>
          <button onClick={handleReset}>reset</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew