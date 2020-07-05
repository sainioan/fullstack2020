import React from 'react'


const CommentForm = ({ handleSubmit, content }) => {

  return (

    <div className='commentForm'>
      <h4>Comments</h4>
      <form onSubmit={handleSubmit}>
        <div>
        text
          <input {...content}
          />
        </div>
        <button id="login-button" type="submit">add comment</button>
      </form>
    </div>
  )
}

export default CommentForm