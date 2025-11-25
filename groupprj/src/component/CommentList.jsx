import React, { useState } from 'react'
import SpotlightCard from "@components/SpotlightCard.jsx";
import '../style/SpotlightCard.css';


const CommentList = (props) => {
  const { product, handleComments, Comments, username } = props;

  return (
    <div>
      <SpotlightCard
          spotlightColor="rgba(0, 0, 0, 0.27)"
          className="flex w-full mx-auto justify-between p-4 rounded-2xl shadow-lg m-4"
        >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">

          {/* Comment reviewing area */}
          <div className="space-y-1 mb-6 h-full">
          <h2 className="font-semibold">Reviews:</h2>
          <div className="m-2 space-y-2 w-full h-full mb-4 rounded-2xl">
              {props.Comments.length === 0 ? (
                <div className="mb-4 items-center justify-center rounded-2xl">
                      <h3 className="pt-4 text-lg font-semibold">
                          Be the first to review “{product.name}”
                      </h3>
                    <div className="flex item-center justify-center rounded-2xl bg-white p-4 w-full h-full border-2 border-dashed">
                      <p className="text-sm text-gray-500 w-full justify-center text-center">
                          "There are no reviews yet."
                      </p>
                    </div>
                </div>
              ) : (
                  Comments.slice(0,3).map((comment, index) => (
                      <div key={index} className="flex rounded-2xl shadow-sm bg-white p-4 w-full item-center">
                        <img
                            src="/img/UserAvatar.jpg"
                            alt="avatar"
                            className="w-12 h-12 rounded-full border-1 border-indigo-500 shadow-sm"
                          />
                          <div className="flex flex-col ml-3">
                          <p className="font-light text-sm text-gray-500 -mt-1">{username} 
                          </p>                      
                            <span className="font-medium text-gray-900 text-md -mt-4">{comment}</span> 
                          </div>                     
                          {/*if(Comment.length>3){<a href={detailToggle}>Show details</a>}*/}
                      </div>
                  ))
              )}
            </div>
              
            </div>
            {/* Form */}
            <div className="w-full">
            <div className="space-y-6">
              {/* Rating row (static / simple for now) */}
                <div>
                <h3 className="font-bold text-gray-800 mb-2">Your Rating: </h3>
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
                    className="w-full rounded-xl mb-2 border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800  focus:ring-1 focus:ring-blue-500 focus:outline-none hover:ring-1 hover:ring-blue-500"
                    placeholder="Write your review here..."
                  />
                  </div>
                  <div className="space-x-2 flex">
                  <button className="bg-opacity-0 text-gray-900 border-1 w-full border-gray-900 py-2 px-5 rounded-xl text-lg font-medium  hover:bg-black hover:text-white transition"
                  onClick={(e) => e.target.form.reset()}
                  >Discard</button>
                  <button className="bg-black text-white py-2 px-5 w-full rounded-xl text-lg font-medium hover:!bg-blue-600 transition">Submit</button>
                  </div>
                </form>
                </div>
          </div>
        </div>
       </SpotlightCard>
      </div>
  )
}

export default CommentList