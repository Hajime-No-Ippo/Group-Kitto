import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Products from "../Data/ProductData";
import "../style/marketUi.css";

export default function SearchResult() {
  const navigate = useNavigate();
  const { search } = useLocation();

  // --- Get keyword from URL ---
  const query = new URLSearchParams(search).get("query")?.toLowerCase() || "";

  // --- State for sorting + category filter ---
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("");

  // --- Compute filtered products ---
  const filteredProducts = useMemo(() => {
    let result = Products.filter((item) =>
      item.name.toLowerCase().includes(query)
    );

    // Filter by category
    if (category) {
      result = result.filter((item) => item.category === category);
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [query, category, sortBy]);

  return (
    <div className="container mt-4">
      <h3>
        Search Results for: <span className="text-primary">{query}</span>
      </h3>

      <button
        className="btn btn-outline-secondary mt-2 mb-4"
        onClick={() => navigate("/home")}
      >
        ← Back to Home
      </button>

      {/* -------- Filter Section -------- */}
      <div className="d-flex gap-3 mb-4">
        {/* Category Filter */}
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Clothes">Clothes</option>
          <option value="Shoes">Shoes</option>
          <option value="Electronics">Electronics</option>
        </select>

        {/* Sorting */}
        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="price-asc">Price: Low ➜ High</option>
          <option value="price-desc">Price: High ➜ Low</option>
          <option value="name-asc">Name: A ➜ Z</option>
        </select>
      </div>

      {/* -------- Products -------- */}
      {filteredProducts.length === 0 ? (
        <p className="text-danger fw-bold fs-5">No products found.</p>
      ) : (
        <div className="row g-4">
          {filteredProducts.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="col-6 col-md-4 col-lg-3 col-xl-2"
            >
              <div
                className="card h-100 clickable-card"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.img} className="card-img-top" alt={item.name} />
                <div className="card-body text-center p-2">
                  <p className="fw-semibold small m-0">{item.name}</p>
                  <p className="small text-muted">${item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
