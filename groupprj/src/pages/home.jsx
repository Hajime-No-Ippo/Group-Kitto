import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../component/FetchData.jsx";
import "../style/marketUi.css";

export default function Home() {
  const navigate = useNavigate();
  const Products = useFetchData();

  // Filters
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;

    navigate(
      `/search?query=${query}&category=${category}&condition=${condition}`
    );
  };

  return (
    <>
      <h1 className="font-semibold text-center mt-10">
        Choose Better. Live Greener.
      </h1>
      <h1 className="font-light text-center mt-1 italic">
        Every item reused saves a piece of our planet.
      </h1>

      <div className="container mt-2">
        {/* --- Search Box --- */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="input-group mb-3">
            <input
              type="text"
              name="search"
              className="form-control"
              placeholder="Search products..."
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>

          {/* --- Filters --- */}
          <div className="d-flex gap-3">
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
          </div>
        </form>

        <button
          className="btn btn-success px-4 py-2 mb-4"
          onClick={() => navigate("/addItem")}
        >
          + Post New Item
        </button>

        <h4 className="fw-bold mb-3">Recommended for you</h4>

        {/* --- Products Grid --- */}
        <div className="row g-4">
          {Products?.length > 0 ? (
            Products.map((item) => (
              <div key={item.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
                <div
                  className="card h-100 clickable-card"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img
                    src={item.img}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body text-center p-2">
                    <p className="fw-semibold small m-0">{item.name}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading items...</p>
          )}
        </div>
      </div>
    </>
  );
}
