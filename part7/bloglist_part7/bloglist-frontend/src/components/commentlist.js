
import React from 'react'
import { useSelector } from 'react-redux'
import Comment from './Comment'

const CommentList = ({ blog }) => {

  const comments = useSelector(state => state.comments)

  return comments ? (
    <div>
      {comments.map(comment =>
        <Comment
          key={comment.id}
          comment={comment}
          blog = {blog}
        />
      )}
      <div>  </div>
    </div>

  ) : null
}

export default CommentList