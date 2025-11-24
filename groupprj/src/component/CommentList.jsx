import React, { useState } from 'react'
import SpotlightCard from "@components/SpotlightCard.jsx";
import '../style/SpotlightCard.css';


const CommentList = (props) => {
  const { product, handleComments, Comments } = props;
  return (
    <div>
      <SpotlightCard
          spotlightColor="rgba(0, 0, 0, 0.27)"
          className="flex w-full mx-auto justify-between p-4 rounded-2xl shadow-lg m-4"
        >
        <div className="space-y-2 mb-6">
        <h2 className="font-semibold">Reviews:</h2>
        
            {props.Comments.length === 0 ? (
              <div>
                <h3 className="pt-4 text-lg font-semibold">
              Be the first to review “{product.name}”
            </h3>
              <p className="text-sm text-gray-500">
                  There are no reviews yet.
              </p>
              </div>
            ) : (
                Comments.map((comment, index) => (
                    <div key={index} className='comment-item'>
                        <p>{comment}</p>
                    </div>
                ))
            )}
            
            
          </div>
          {/* Form */}
          <div className="space-y-6">
            {/* Rating row (static / simple for now) */}
              <div>
              <p className="text-sm font-medium text-gray-800 mb-2">Your Rating: </p>
              <div className="flex items-center gap-1 text-xl text-amber-400">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span className="text-gray-300">★</span>
              </div>
              </div>


      
              <h3>Add a Comment:</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const newComment = e.target.elements.comment.value;
                  handleComments(newComment);
                  e.target.reset();
                }}>
                <div className="space-y-2">
                <label
                  htmlFor="comment"
                  className="text-sm font-medium text-gray-800"
                >
                  Your Review *
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  required
                  rows={5}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Write your review here..."
                />
                </div>
                <button>Submit</button>
              </form>
        </div>
       </SpotlightCard>
      </div>
  )
}

export default CommentList