
import React from 'react'
import { useSelector } from 'react-redux'
import Comment from './Comment'
import { ListGroup} from 'react-bootstrap'
const CommentList = ({ blog }) => {

  const comments = useSelector(state => state.comments)

  return comments ? (
    <div>
      <ListGroup>
        {comments.map(comment =>
          <ListGroup.Item  key={comment.id}>
            <Comment
              key={comment.id}
              comment={comment}
              blog = {blog}
            />
          </ListGroup.Item>)}
      </ListGroup>
    </div>

  ) : null
}

export default CommentList