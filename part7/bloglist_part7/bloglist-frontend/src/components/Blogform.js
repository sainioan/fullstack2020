import React, { useState } from 'react'


const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes,setLikes] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    const newBlog= {
      title,
      author,
      url,
      likes
    }
    onSubmit(newBlog)
  }
  return (
    <div className="formDiv">
      <div>
        <h3>Create a new blog</h3>
        <form  onSubmit={createBlog}>
          <p className="formDiv">
            Title:
            <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </p>
          <p className="formDiv">
            Author:
            <input id="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </p>
          <p className="formDiv">
           Url:
            <input id="url" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
          </p>
          <p className="formDiv">
            Likes:
            <input id="likes" type="number" value={likes} onChange={(e) => setLikes(e.target.value)} />
          </p>
          <p>
            <button id="createButton">Create</button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default BlogForm


