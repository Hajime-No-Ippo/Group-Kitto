import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchData from "../component/FetchData.jsx";
import "../style/theme.css";

export default function SearchResult() {
  const navigate = useNavigate();
  const { search } = useLocation(); // get the URL info (everything after ?)

  const Products = useFetchData(); // load all products

  // Get search words and filters from the URL
  const query = new URLSearchParams(search).get("query")?.toLowerCase() || "";
  const categoryFromURL = new URLSearchParams(search).get("category") || "";
  const conditionFromURL = new URLSearchParams(search).get("condition") || "";

  // Save sorting and filters in state
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState(categoryFromURL);
  const [condition, setCondition] = useState(conditionFromURL);

  // Filter and sort product list
  const filteredProducts = useMemo(() => {
    // check if product name includes the search text
    let result = Products.filter((item) =>
      item.name?.toLowerCase().includes(query)
    );

    // filter by category if user chose one
    if (category) result = result.filter((item) => item.category === category);

    // filter by condition if user chose one
    if (condition)
      result = result.filter((item) => item.condition === condition);

    // sorting rules
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "name-asc")
      result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [Products, query, category, condition, sortBy]);

  return (
    <div className="max-w-[1320px] mx-auto px-4 py-8">
      {/* Page title */}
      <h3 className="text-3xl font-bold text-[var(--text-main)] mb-8">
        Search Results for:{" "}
        <span className="text-[var(--primary)]">{query}</span>
      </h3>

      {/* All filter dropdowns */}
      <div className="flex gap-3 mb-8 max-w-[900px]">
        {/* Category filter */}
        <select
          className="flex-1 px-4 py-3 border border-[var(--border)] rounded-lg bg-white text-[var(--text-main)]  focus:outline-none focus:ring-2 focus:ring-[var(--accent-btn)] focus:border-transparent cursor-pointer"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="">Any Condition</option>
          <option value="new">New</option>
          <option value="like new">Like New</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
        </select>

        {/* Sort options */}
        <select
          className="flex-1 px-4 py-3 border border-[var(--border)] rounded-lg bg-white text-[var(--text-main)]focus:outline-none focus:ring-2 focus:ring-[var(--accent-btn)] focus:border-transparent cursor-pointer"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="price-asc">Price ↑ (low to high)</option>
          <option value="price-desc">Price ↓ (high to low)</option>
          <option value="name-asc">Name A→Z</option>
        </select>
      </div>

      {/* Show product list */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-6">
        {filteredProducts.length === 0 ? (
          // If no products match the search
          <p className="col-span-full text-red-600 font-bold text-lg text-center py-12">
            No products found.
          </p>
        ) : (
          filteredProducts.map((item) => (
            <div key={item.id}>
              <div
                className="clickable-card h-full"
                onClick={() => navigate(`/product/${item.id}`)} // go to detail page
              >
                <img src={item.img} alt={item.name} />
                <div className="card-body">
                  <p className="font-semibold text-sm m-0">{item.name}</p>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    ${item.price}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
