import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Products from "../Data/ProductData";
import "../style/marketUi.css";

export default function SearchResult() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const query = new URLSearchParams(search).get("query")?.toLowerCase() || "";

  const filteredProducts = Products.filter((item) =>
    item.name.toLowerCase().includes(query)
  );

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

      {filteredProducts.length === 0 ? (
        <p className="text-danger fw-bold fs-5">No products found.</p>
      ) : (
        <div className="row g-4">
          {filteredProducts.map((item) => (
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
      )}
    </div>
  );
}
