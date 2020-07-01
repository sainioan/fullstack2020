
import blogService from '../services/blogs'
import { setNotification, clearNotification } from './notificationReducer'
import { useDispatch } from 'react-redux'
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
  case 'DELETE_BLOG':
    return state.filter( b => b.id !== action.data)
  case 'UPDATE_BLOGS':
    return action.data
  case  'EMPTY_ACTION':
    return null
  default:
    return state
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const data = await blogService.create(blog)

      dispatch({
        type: 'CREATE',
        data
      })
      // dispatch(setNotification(`New blog '${blog.title}' by ${blog.author} added`,10))
    }
    catch (error) {
      console.log(error.message)
    }
  }
}
export const deleteBlog = (blog) => {

  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
}
export const emptyAction = () => {

  return dispatch => {
    dispatch({
      type: 'EMPTY_ACTION'
    })
  }
}
export const updateBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'UPDATE_BLOGS',
      data: blogs
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