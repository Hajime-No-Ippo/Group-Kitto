import React from "react";
import { useNavigate } from "react-router-dom";
import Products from "../Data/ProductData";
import "../style/marketUi.css";

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    navigate(`/search?query=${query}`);
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
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
      </form>

      <div className="mb-4">
        <button
          className="btn btn-success px-4 py-2"
          onClick={() => navigate("/addItem")}
        >
          + Post New Item
        </button>
      </div>

      <h4 className="fw-bold mb-3">Recommended for you</h4>
      <div className="row g-4">
        {Products.map((item) => (
          <div key={item.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
            <div
              className="card h-100 clickable-card"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <img src={item.img} className="card-img-top" alt={item.name} />
              <div className="card-body text-center p-2">
                <p className="fw-semibold small m-0">{item.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
