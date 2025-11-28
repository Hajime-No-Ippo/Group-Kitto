import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchData from "../component/FetchData.jsx";
import "../style/marketUi.css";

export default function SearchResult() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const Products = useFetchData();

  const query = new URLSearchParams(search).get("query")?.toLowerCase() || "";
  const categoryFromURL = new URLSearchParams(search).get("category") || "";
  const conditionFromURL = new URLSearchParams(search).get("condition") || "";

  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState(categoryFromURL);
  const [condition, setCondition] = useState(conditionFromURL);

  const filteredProducts = useMemo(() => {
    let result = Products.filter((item) =>
      item.name?.toLowerCase().includes(query)
    );

    if (category) result = result.filter((item) => item.category === category);
    if (condition)
      result = result.filter((item) => item.condition === condition);

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "name-asc")
      result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [Products, query, category, condition, sortBy]);

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

      <div className="d-flex gap-3 mb-4">
        <select
          className="form-select"
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

        <select
          className="form-select"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="">Any Condition</option>
          <option value="new">New</option>
          <option value="like new">Like New</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
        </select>

        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="name-asc">Name A→Z</option>
        </select>
      </div>

      <div className="row g-4">
        {filteredProducts.length === 0 ? (
          <p className="text-danger fw-bold fs-5">No products found.</p>
        ) : (
          filteredProducts.map((item) => (
            <div key={item.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
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
          ))
        )}
      </div>
    </div>
  );
}
