import React, { useState } from 'react'
import SpotlightCard from "@components/SpotlightCard.jsx";
import '../style/SpotlightCard.css';


const CommentList = (props) => {
  const { product, handleComments, Comments } = props;
  return (
    <div>
      <h2 className="font-semibold mt-4">Comments:</h2>
      <SpotlightCard
          spotlightColor="rgba(0, 0, 0, 0.27)"
          className="relative flex rounded-2xl shadow-lg"
        >

      <h2>Reviews:</h2>
      <div className='comments-container'>
            {props.Comments.length === 0 ? (
              <div className="font-semibold">
                <p>Be the first to comment {product.name}</p>
              </div>
            ) : (
                Comments.map((comment, index) => (
                    <div key={index} className='comment-item'>
                        <p>{comment}</p>
                    </div>
                ))
            )}
        </div>

        <div className='comment-form'>
            <h3>Add a Comment:</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newComment = e.target.elements.comment.value;
              handleComments(newComment);
              e.target.reset();
            }}>
                <textarea name="comment" rows="4" cols="50" required></textarea>
              <button>Submit</button>
            </form>
          </div>
       </SpotlightCard>
          
          
      </div>
  )
}

export default CommentList