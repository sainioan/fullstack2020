import React from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
export const User = ({ user }) => {


  const allblogs = useSelector(state => state.blogs)
  if(!allblogs) {
    return null
  }
  console.log(allblogs)
  if(!user) {
    return null
  }
  console.log('user component username', user.name)
  const blogs = allblogs.filter(blog => blog.user.id === user.id)

  if(blogs.length===0) {
    return (
      <div>
        <h3>{user.name}</h3>
        <div>
          <p> has not created any blogs </p>
        </div>
      </div>
    )
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <p> blogs added </p>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link> </td></tr>)}
        </tbody>
      </Table>
    </div>
  )

}

export default User