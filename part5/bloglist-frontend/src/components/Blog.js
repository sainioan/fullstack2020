import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react'

const Blog = ({ blog, blogs }) => {
  const [viewEverything, setViewEverything] = useState(true)
  const blogsToView = viewEverything
  ? blogs
  : blogs.map(blog => blog.title)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if(!viewEverything)
  return (
    <div style={blogStyle}>
     <div> title: {blog.title} <button onClick={() => setViewEverything(!viewEverything)}>
         {viewEverything ? 'hide' : 'view' }
        </button> 
        </div>      
{/*       <ul>
        {blogsToView.map((blog, i) => 
          <blog
            key={i}
            blog={blog.title} 
          />
        )}
      </ul> */}
      </div>
  )   
      if(viewEverything)
      return (
        <div style={blogStyle}>
        <div> title: {blog.title} <button onClick={() => setViewEverything(!viewEverything)}>
            {viewEverything ? 'hide' : 'view' }
           </button> 
           </div>   
      <div>
      <div></div>url: {blog.url}
      <div> likes: {blog.likes} <button type ="submit" >like</button></div>
      <div></div> author: {blog.author} 
      </div>
    
  </div>
)
  }

export default Blog
