import React, { useState, useImperativeHandle }from 'react'

   const BlogForm = (props) => {

  return (
    <div>
      <h2>Create a new blog</h2>
      <form className="Blog Form" onSubmit={props.onSubmit}>
        <p>
           <label htmlFor="title">Title: </label>
          <input id='title' type="text" name ="title" title={props.title} onChange={props.handleTitleChange} />
        </p>
        <p>
        <label htmlFor="author">Author: </label>
          <input id="author" type="text"  name ="author" author={props.author}  onChange={props.handleAuthorChange}/>
        </p>
        <p>
        <label htmlFor="url">Url: </label>
          <input id='url' type="text" name ="url" url={props.url} onChange={props.handleUrlChange}/>
        </p>
        <p>
        <label htmlFor="likes">Likes: </label>
          <input id='likes' type="number" name="likes" likes = {props.likes} onChange = {props.handleLikeChange}/>
        </p>
        <p>
          <button type="submit">create</button>
        </p>
      </form>
    </div>
  )
}

export default BlogForm 