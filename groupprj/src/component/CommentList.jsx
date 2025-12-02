import React from 'react'
import { useEffect, useState } from "react";
import { db } from "../firebase"; 
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { TrashIcon } from "@heroicons/react/24/solid";
import Toast from './Toast';

import SpotlightCard from "@components/SpotlightCard.jsx";

import '../style/SpotlightCard.css';


const CommentList = (props) => {
  const { product, addComment,currentUser,deleteComment } = props;
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);


   // Load comments from Firestore
  useEffect(() => {
    if (!product?.id) return;

    const q = query(
      collection(db, "items", product.id, "comments"),
      orderBy("commentAt", "desc") // 🔥 Must match your Firestore field name
    );

    //Delete Comment 
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });

    return unsubscribe;
  }, [product.id]);

  return (
    
      <SpotlightCard
          spotlightColor="rgba(0, 0, 0, 0.27)"
          className="flex justify-between p-4 rounded-2xl shadow-md m-8"
        >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">

          {/* Comment reviewing area */}
          <div className="h-full">
          <div className="space-y-6">
              {comments.length === 0 ? (
                <div className=" items-center justify-center rounded-2xl">
                      <h3 className="font-bold text-brand mb-2">Be the first to rate "{product.name}" ...... </h3>
                    <div className="flex item-center justify-center rounded-2xl bg-white p-40 w-full h-full border-2 border-dashed">
                      <p className="text-sm text-gray-500 w-full h-full justify-center text-center">
                          "There are no reviews yet."
                      </p>
                    </div>
                </div>
              ) : (
                  comments.slice(0,3).map((c, index) => (
                    <>
                    <h3 className="font-bold text-brand mb-2">Latest Review on "{product.name}"</h3>
                      <div key={index} className="flex rounded-2xl shadow-sm bg-white p-4 w-full justify-between item-center">
                        <div className="flex">
                        <img
                            src="/img/UserAvatar.jpg"
                            alt="avatar"
                            className="w-12 h-12 rounded-full border-1 border-brand shadow-sm justify-center item-center"
                          />
                          <div className="flex flex-col ml-3">
                          <p className="font-light text-md text-brand">{c.username} 
                          </p>                      
                            <span className="font-medium text-brand text-md ">{c.message}</span> 
                            <p className="font-light text-sm text-muted">{c.commentAt?.toDate().toLocaleString()}</p> 
                             
                          </div>
                        </div>
                          <div className="flex item-center justify-center">                     
                            {currentUser && (
                                <button
                                className="justify-center align-right"
                                onClick={() => deleteComment(product.id, c.id)}
                              >
                                <TrashIcon className="w-5 h-5 text-brand hover:text-red-700 transition" />
                            </button>
                            )}
                            </div>
                          {/*if(Comment.length>3){<a href={detailToggle}>Show details</a>}*/}
                      </div>
                      </>
                  ))
              )}
            </div>
              
            </div>
            {/* Form */}
            <div className="w-full">
            <div className="space-y-6">
              {/* Rating row (static / simple for now) */}
                
                <h3 className="font-bold text-brand mb-2">Add a Comment:</h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    await addComment(product.id, currentUser, commentInput);
                    setCommentInput("");
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
                    value={commentInput}
                    name="comment"
                    required
                    rows={5}
                    className="w-full rounded-xl mb-2 border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800  focus:ring-1 focus:ring-accent focus:outline-none hover:ring-1 hover:ring-accent"
                    placeholder="Write your review here..."
                    onChange={(e) => setCommentInput(e.target.value)} 
                  />
                  </div>
                  <div className="space-x-4 flex">
                  <button className="bg-opacity-0 text-[var(--primary)] border-1 w-full border-[var(--primary)] rounded-full text-lg font-medium  hover:bg-brand hover:text-white transition"
                  onClick={(e) => e.target.form.reset()}
                  >Discard</button>
                  <button className="w-full py-3 bg-[var(--primary)] text-white font-semibold rounded-full hover:bg-[var(--accent-btn)] hover:!text-[var(--primary)] transition">Submit</button>
                  </div>
                </form>
                </div>
          </div>
        </div>
       </SpotlightCard>
      
  )
}

export default CommentList