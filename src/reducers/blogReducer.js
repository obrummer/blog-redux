import blogService from '../services/blogs'

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const likeBlog = (id, blogObject) => {
  return async dispatch => {
    const toLike = {...blogObject, likes: blogObject.likes + 1 }
    const updatedBlog = await blogService.update(id, toLike);
    console.log(updatedBlog)
    dispatch({
      type: 'ADD_LIKE',
      data: updatedBlog,
    })
  }
}

export const terminateBlog = (blogObject) => {
  return async dispatch => {
    const removedBlog = await blogService.remove(blogObject.id);
    dispatch({
      type: 'REMOVE_BLOG',
      data: removedBlog,
      id: blogObject.id,
    })
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'CREATE_BLOG':
      return state.concat(action.data)
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_LIKE':
      const liked = action.data
      return state.map(a => a.id === liked.id ? liked : a)
    case 'REMOVE_BLOG':
      const removed = action.id
      return state.filter(b => b.id !== removed)
    default:
      return state
  }
}

export default blogReducer