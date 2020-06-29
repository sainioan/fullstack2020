
import blogService from '../services/blogs'

const byLikes = (a1, a2) => a2.likes - a1.likes

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data.sort(byLikes)
  case 'LIKE':
   // const blog = state.find(blog => blog.id === action.data.id)
    // return   state.map(blog => blog.id === action.data.id ? action.data : blog)
    // return state.map(a => a.id===liked.id ? liked : a).sort(byLikes)
  //  const liked_blog = { ...blog, likes: blog.likes +1 }
  //  return state.map(blog => blog.id!== action.data.id?blog: liked_blog)
  return state.map(blog => blog.id=== action.data.id? action.data: blog)

  case 'CREATE':
    return [...state, action.data]
  default:
    return state
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const data = await blogService.createNew(content)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const data = await blogService.update({ ...blog, likes: blog.likes + 1, user: blog.user.id })
    dispatch({
      type: 'LIKE',
      data: data
    })
  }
}


export default reducer