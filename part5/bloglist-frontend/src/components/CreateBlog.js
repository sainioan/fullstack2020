import React from 'react'

const CreateBlog = ({ onSubmit, handleTitleChange, handleAuthorChange, handleUrlChange, title, author, url}) => {
  return (
    <div>
      <h2>Create a new blog</h2>
       <form onSubmit={onSubmit}>
           <p></p>
           title:
           <input title={title} onChange={handleTitleChange} />
           <p></p>
            author:
           <input author={author} onChange={handleAuthorChange}/>
           <p></p>
           url:
           <input url={url} onChange={handleUrlChange}/>
           <p></p>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog