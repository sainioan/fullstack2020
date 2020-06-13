import React from 'react'

const CreateBlog = ({ onSubmit, handleTitleChange, handleAuthorChange, handleUrlChange, handleLikeChange, title, author, url,likes}) => {
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
           likes:
           <input likes = {likes} onChange = {handleLikeChange}/>
           <p></p>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog