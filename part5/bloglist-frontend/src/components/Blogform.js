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
        <h3>Create new blog</h3>
        <form  onSubmit={createBlog}>
          <div className="formDiv">
            <label htmlFor="title">title: </label>
            <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="formDiv">
            <label htmlFor="author">author: </label>
            <input id="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div className="formDiv">
            <label htmlFor="url">url: </label>
            <input id="url" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          <div className="formDiv">
            <label htmlFor="likes">likes: </label>
            <input id="likes" type="number" value={likes} onChange={(e) => setLikes(e.target.value)} />
          </div>
          <button id="createButton">create</button>
        </form>
      </div>
    </div>
  )
}

export default BlogForm


