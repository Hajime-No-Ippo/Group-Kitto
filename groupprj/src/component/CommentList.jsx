import React, { useState } from 'react'

const CommentList = (props) => {
  return (
    <div>Comments:
      
        <h2>Customer Reviews:</h2>
        <div className='comment-form'>
            <h3>Add a Comment:</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newComment = e.target.elements.comment.value;
              props.handleComments(newComment);
              e.target.reset();
            }}>
                <textarea name="comment" rows="4" cols="50" required></textarea>
              <button>Submit</button>
            </form>
          </div>
        <div className='comments-container'>
            {props.Comments.length === 0 ? (
                <p>No comments available</p>
            ) : (
                props.Comments.map((comment, index) => (
                    <div key={index} className='comment-item'>
                        <p>{comment}</p>
                    </div>
                ))
            )}
        </div>
        
      </div>
  )
}

export default CommentList