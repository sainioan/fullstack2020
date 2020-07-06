
import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import { Table } from 'react-bootstrap'

const BlogList = ({ user }) => {

  const blogs = useSelector(state => state.blogs)

  return blogs ? (
    <div>
      <Table striped>
        <tbody>
          {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
            <tr key={blog.id}>
              <td>
                <Blog
                  key={blog.id}
                  blog={blog}
                  user = {user}
                />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>

  ) : null
}

export default BlogList