import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../component/FetchData.jsx";
import "../style/theme.css";

export default function Home() {
  const navigate = useNavigate();
  const Products = useFetchData(); // get product list from custom hook

  // save the chosen category
  const [category, setCategory] = useState("");
  // save the chosen condition
  const [condition, setCondition] = useState("");

  // When user hits the search button
  const handleSearch = (e) => {
    e.preventDefault(); // stop form refreshing the page
    const query = e.target.search.value; // get what user typed in
    navigate(
      `/search?query=${query}&category=${category}&condition=${condition}` // go to search page with filters
    );
  };

  return (
    <>
      {/* Simple page title */}
      <h1 className="text-center mt-10 font-semibold text-[var(--primary)]">
        Choose Better, Live Greener
      </h1>

      {/* Small subtitle */}
      <h1 className="text-center mt-1 text-[14px] text-[var(--text-muted)]">
        Every item reused saves a piece of our planet.
      </h1>

      <div className="max-w-[1320px] mx-auto px-4 mt-4">
        {/* Search Box */}
        <form onSubmit={handleSearch} className="mb-4">
          {/* Main search bar */}
          <div className="max-w-[650px] mx-auto my-[26px] flex items-center bg-white rounded-[50px] border border-[var(--border)] overflow-hidden pr-1">
            <input
              type="text"
              name="search"
              className="flex-1 border-0 px-[22px] py-[15px] text-base text-[var(--text-main)] focus:outline-none placeholder:opacity-70 placeholder:text-[var(--text-muted)]"
              placeholder="Search products..." // text shown before typing
            />
            <button
              type="submit"
              className="border-0 bg-[var(--accent-btn)] text-[var(--primary)] font-semibold px-7 h-12 rounded-[50px] hover:brightness-95 translate-x-[-3px] transition"
            >
              Search
            </button>
          </div>

          {/* Filters below the search box */}
          <div className="flex gap-3 max-w-[650px] mx-auto">
            {/* Category filter */}
            <select
              className="flex-1 px-4 py-3 border border-[var(--border)] rounded-lg bg-white text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-btn)] focus:border-transparent cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)} // save selected category
            >
              <option value="">All Categories</option>
              <option value="book">Book</option>
              <option value="electronic">Electronic</option>
              <option value="clothes">Clothes</option>
              <option value="shoes">Shoes</option>
              <option value="others">Others</option>
            </select>

            {/* Condition filter */}
            <select
              className="flex-1 px-4 py-3 border border-[var(--border)] rounded-lg bg-white text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-btn)] focus:border-transparent cursor-pointer"
              value={condition}
              onChange={(e) => setCondition(e.target.value)} // save selected condition
            >
              <option value="">Any Condition</option>
              <option value="new">New</option>
              <option value="like new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>
        </form>

        {/* Button for posting a new item */}
        <div className="w-full flex justify-center">
          <button
            className="px-6 py-3 bg-[var(--accent-btn)] text-[var(--primary)] font-semibold rounded-full "
            onClick={() => navigate("/addItem")} // go to "add item" page
          >
            + Post New Item
          </button>
        </div>

        {/* Title for the product list */}
        <h4 className="font-bold mb-3 text-[var(--primary)] mt-4">
          Recommended for you
        </h4>

        {/* Grid showing all products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Products?.length > 0 ? (
            Products.map((item) => (
              <div key={item.id}>
                <div
                  className="clickable-card bg-white rounded-[14px] cursor-pointer shadow-[0_3px_12px_rgba(0,0,0,0.05)] transition-all duration-250 hover:shadow-lg hover:-translate-y-1"
                  onClick={() => navigate(`/product/${item.id}`)} // go to product page
                >
                  {/* Product image */}
                  <img
                    src={item.img}
                    className="w-full aspect-square object-cover rounded-t-[14px]"
                    alt={item.name}
                  />

                  {/* Product name */}
                  <div className="text-center p-2">
                    <p className="font-medium text-[0.9rem] m-0 mt-2 text-[var(--text-muted)]">
                      {item.name}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // When no products loaded yet
            <p className="col-span-full text-center text-[var(--text-muted)]">
              Loading items...
            </p>
          )}
        </div>
      </div>
    </>
  );
}
