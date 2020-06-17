import React from 'react'
// const CreateBlog = ({ onSubmit, handleTitleChange, handleAuthorChange, handleUrlChange, handleLikeChange, title, author, url,likes }) => {
   const BlogForm = (props) => {

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={props.onSubmit}>
        <p>
           title:
          <input id='title' type="text" title={props.title} onChange={props.handleTitleChange} />
        </p>
        <p>
            author:
          <input  id='author' type="text"  author={props.author} onChange={props.handleAuthorChange}/>
        </p>
        <p>
           url:
          <input id='url' type="text" url={props.url} onChange={props.handleUrlChange}/>
        </p>
        <p>
           likes:
          <input id='likes' type="number" likes = {props.likes} onChange = {props.handleLikeChange}/>
        </p>
        <p>
          <button type="submit">create</button>
        </p>
      </form>
    </div>
  )
}

export default BlogForm 