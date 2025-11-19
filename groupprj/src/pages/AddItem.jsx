import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // import useNavigate
import { v4 as uuidv4 } from "uuid";

export default function AddItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("book");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("new");

  const navigate = useNavigate(); // initialize navigate

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

    const productId = uuidv4(); // generate unique product ID

    try {
      await addDoc(collection(db, "items"), {
        name,
        description,
        category,
        price,
        condition,
        productId,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });

      // Show alert and navigate to homepage
      alert("Item published successfully!");
      navigate("/home"); // navigate to homepage

      // Reset form
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
    <div className="min-h-screen flex items-start justify-center bg-gray-100 p-4 relative">
      {/* Back button */}
      <button
        onClick={() => navigate("/home")}
        className="absolute left-4 top-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg transition-all duration-200"
      >
        Back
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 mt-16"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Publish Your Item
        </h2>

        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Item description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex flex-col md:flex-row md:gap-4">
          <label className="flex-1 flex flex-col">
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="book">Book</option>
              <option value="electronic">Electronic</option>
              <option value="clothes">Clothes</option>
              <option value="shoes">Shoes</option>
              <option value="others">Others</option>
            </select>
          </label>

          <label className="flex-1 flex flex-col mt-2 md:mt-0">
            Condition:
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="new">New</option>
              <option value="like new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </label>
        </div>

        <input
          type="number"
          placeholder="Price (EUR)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg p-3 mt-2 transition-all duration-200"
        >
          Publish Item
        </button>
      </form>
    </div>
  );
}
