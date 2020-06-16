/*   
import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => {
    return (
        <div>
            <h4>New Blog</h4>
            <form onSubmit={props.handleNewBlog} id='form'>
                <div>
                    Title:
                    <input
                        id='title'
                        value={props.title}
                        onChange={props.handleTitleChange}
                    />
                </div>
                <div>
                    Author:
                    <input
                        id='author'
                        value={props.author}
                        onChange={props.handleAuthorChange}
                    />
                </div>
                <div>
                    Url:
                    <input
                        id='url'
                        value={props.url}
                        onChange={props.handleUrlChange}
                    />
                </div>
                <button type="submit" id='addBlogButton'>Create</button>
            </form>
        </div>
    )
}

export default BlogForm */
import React from 'react'
// const CreateBlog = ({ onSubmit, handleTitleChange, handleAuthorChange, handleUrlChange, handleLikeChange, title, author, url,likes }) => {
   const CreateBlog = (props) => {

  return (
    <div>
      <h2>Create a new blog</h2>
      <form id='form' onSubmit={props.onSubmit}>
        <p>
           title:
          <input id='title' title={props.title} onChange={props.handleTitleChange} />
        </p>
        <p>
            author:
          <input  id='author' author={props.author} onChange={props.handleAuthorChange}/>
        </p>
        <p>
           url:
          <input id='url' url={props.url} onChange={props.handleUrlChange}/>
        </p>
        <p>
           likes:
          <input id='likes' likes = {props.likes} onChange = {props.handleLikeChange}/>
        </p>
        <p>
          <button type="submit">create</button>
        </p>
      </form>
    </div>
  )
}

export default CreateBlog 