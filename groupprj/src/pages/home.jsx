import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // Product list
  const products = [
    {
      id: 1,
      name: "Vintage Jacket",
      image: "https://via.placeholder.com/250?text=Jacket",
    },
    {
      id: 2,
      name: "Sneakers",
      image: "https://via.placeholder.com/250?text=Sneakers",
    },
    {
      id: 3,
      name: "Backpack",
      image: "https://via.placeholder.com/250?text=Backpack",
    },
    {
      id: 4,
      name: "Handmade Mug",
      image: "https://via.placeholder.com/250?text=Mug",
    },
    {
      id: 5,
      name: "Laptop Stand",
      image: "https://via.placeholder.com/250?text=Stand",
    },
    {
      id: 6,
      name: "Desk Lamp",
      image: "https://via.placeholder.com/250?text=Lamp",
    },
    {
      id: 7,
      name: "Headphones",
      image: "https://via.placeholder.com/250?text=Headphones",
    },
    {
      id: 8,
      name: "Chair",
      image: "https://via.placeholder.com/250?text=Chair",
    },
    {
      id: 9,
      name: "Bottle",
      image: "https://via.placeholder.com/250?text=Bottle",
    },
    {
      id: 10,
      name: "Tote Bag",
      image: "https://via.placeholder.com/250?text=Tote+Bag",
    },
  ];

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    navigate(`/search?query=${query}`);
  };

  return (
    <div className="container mt-4">
      {/* Search bar at top */}
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

      {/* Post item button */}
      <div className="mb-4">
        <button
          className="btn btn-success px-4 py-2"
          onClick={() => navigate("/post")}
        >
          + Post New Item
        </button>
      </div>

      {/* Product Grid */}
      <h4 className="fw-bold mb-3">Recommended for you</h4>
      <div className="row g-4">
        {products.map((item) => (
          <div key={item.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
            <div
              className="card h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <img src={item.image} className="card-img-top" alt={item.name} />
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
