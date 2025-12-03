import React from "react";
import ProductGallery from "./ProductGallery.jsx";
import { useNavigate } from "react-router-dom";
import SpotlightCard from "@components/SpotlightCard.jsx";

import "../style/SpotlightCard.css";
// ⭐ added
import LikeIt from "../component/likeItButton.jsx";

const ProductInfo = (props) => {
  const { product, clicked, userId, sellerName, sellerEmail } = props;

  const handleEmailSeller = () => {
    const email = sellerEmail; // e.g., "eva@gmail.com"
    const productName = product.name; // e.g., "Bluetooth Speaker"
    const productId = product.id; // optional
    const name = product.sellerName || "Seller"; // Eva

    const subject = `Inquiry about ${productName}`;
    const body =
      `Hi ${name},%0D%0A%0D%0A` +
      `Hope this letter could reach you well. %0D%0A` +
      `I'm interested in your product "${productName}".%0D%0A` +
      `Product ID: ${productId}%0D%0A%0D%0A` +
      `Is it still available?%0D%0A%0D%0AThank you!`;

    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
      subject
    )}&body=${body}`;

    window.open(gmailURL, "_blank");
  };

  if (!product) return <p>No product selected.</p>;

  return (
    <>
      <SpotlightCard
        spotlightColor="rgba(0, 0, 0, 0.27)"
        className="relative flex rounded-2xl shadow-md m-8"
      >
        <div className="w-1/2 rounded-2xl">
            <div key={product.id} className="w-full h-full !object-bottom">
              {/* LEFT: Product Image */}
              <ProductGallery images={[product.img]}/> 
            </div>
        </div>

        {/* RIGHT: PRODUCT DETAILS */}
        <div className="flex flex-col p-10 space-y-6 justify-center item-center ">
          {/* Title */}
          <h1 className="font-bold text-left">{product.name}</h1>

          {/* RIGHT: Product Description */}
          <h2 className="mb-6">"{product.description}"</h2>

          {/* RIGHT: Product Details */}
          <h1 className="font-bold text-left">${product.price}</h1>
          <ul className=" space-y-2 pl-0 ">
            <li className="font-light text-lg">Category: {product.category}</li>
            <li className="font-light text-lg">
              Condition: {product.condition}
            </li>
            <li className="font-light text-lg">Seller: {sellerName}</li>
            <li className="font-light text-lg">Seller Rating: 4.0 ★★★★<span className="text-gray-300">★</span></li>
          </ul>

          <LikeIt userId={userId} itemId={product.id} />

          <div className="flex mt-6 w-full">
            <button
              className="w-full py-3 bg-[var(--primary)] text-white font-semibold rounded-full hover:bg-[var(--accent-btn)] hover:!text-[var(--primary)]"
              onClick={handleEmailSeller}
            >
              Email Seller
            </button>
          </div>
        </div>
      </SpotlightCard>
    </>
  );
};

export default ProductInfo;
