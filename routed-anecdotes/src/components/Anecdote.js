import React from 'react'
import { useParams } from "react-router-dom"
  
const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(n => n.id === id)
    return (
    <>
        <div>
            Author: {anecdote.author}
        </div>
        <div>
          Content: {anecdote.content}
        </div>
        <div>
          www: {anecdote.info}
        </div>
        <div>
          votes: {anecdote.votes}
        </div>
    </>
    )
  }

export default Anecdote