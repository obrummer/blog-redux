import React from 'react'
import { useParams } from "react-router-dom"

const UserList = ({ users }) => {
    const id = useParams().id
    const user = users.find(n => n.id === id)
    if (!user) {
        return null
      }
console.log(user)
    return (
        <div>
        <h2>User</h2>
        <p>
            {user.name}
        </p>
        <ul>
    {user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
        </ul>
        </div>
    )
    }

export default UserList