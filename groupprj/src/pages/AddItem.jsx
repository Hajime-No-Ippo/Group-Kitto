import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("book");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("new");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price) {
      alert("Please fill all required fields！");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to publish an item!");
      return;
    }

    try {
      await addDoc(collection(db, "items"), {
        name,
        description,
        category,
        price,
        condition,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });

      alert("Item published successfully!");
      navigate("/home");

      setName("");
      setDescription("");
      setCategory("book");
      setPrice("");
      setCondition("new");
      localStorage.removeItem("uploadedItemImage");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to publish item.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-[var(--primary)] tracking-wide mb-10">
        Post New Item
      </h1>

      {/* Main form area */}
      <div className="flex justify-center mt-8 px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white border border-gray-200 rounded-lg shadow-sm p-10"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block font-medium mb-1">Item Name</label>
              <input
                type="text"
                placeholder="Enter item name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="col-span-2">
              <label className="block font-medium mb-1">Description</label>
              <textarea
                placeholder="Describe the item"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-3 h-32 resize-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400"
              >
                <option value="book">Book</option>
                <option value="electronic">Electronic</option>
                <option value="clothes">Clothes</option>
                <option value="shoes">Shoes</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400"
              >
                <option value="new">New</option>
                <option value="like new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block font-medium mb-1">Price (EUR)</label>
              <input
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-[var(--accent-btn)] text-[var(--primary)] font-semibold rounded-md py-3 transition-all"
          >
            Publish Item
          </button>
        </form>
      </div>
    </div>
  );
}
