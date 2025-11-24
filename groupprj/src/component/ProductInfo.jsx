import React from 'react'
import ProductGallery from './ProductGallery.jsx';
import { useNavigate } from 'react-router-dom';
import SpotlightCard from "@components/SpotlightCard.jsx";

import '../style/SpotlightCard.css';
// ⭐ added
import LikeIt from "../component/likeItButton.jsx";  


const ProductInfo = (props) => {
  const {product, addToCart, clicked, userId, sellerName} = props;
  const navigate = useNavigate();
  



  if (!product) return <p>No product selected.</p>;

  return (
    <>
    <h2 className="font-semibold m-4">ProductDetail:</h2>
        <SpotlightCard
          spotlightColor="rgba(0, 0, 0, 0.27)"
          className="relative flex rounded-2xl shadow-lg"
        >
          
        <div className="w-1/2 bg-white rounded-2xl">
            <div key={product.id} className="w-full h-full scale-[1] !object-bottom">
              {/* LEFT: Product Image */}
              <ProductGallery images={[product.img]}/> 
            </div>
        </div>

            {/* RIGHT: PRODUCT DETAILS */}
            <div className="flex-1 p-10 space-y-6">
              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 italic">{product.name}</h1>

              {/* RIGHT: Product Description */}
              <h2 className="mb-6">
                "{product.description}"
              </h2>

                {/* RIGHT: Product Details */}
              <div className="text-gray-800">
              <ul className=" space-y-2 pl-0 ">
                <li className="font-light text-lg">Category: {product.category}</li>
                <li className="font-light text-gray-900 text-lg">Price: ${product.price}</li> 
                <li className="font-light text-lg">Condition: {product.condition}</li>
                <li className="font-light text-lg">Seller: {sellerName}</li>
              </ul>

              <LikeIt 
                userId={userId}
                itemId={product.id}
              />

              <div className="flex mt-6 space-x-1.5">
              <button 
                disabled={clicked}
                className="bg-opacity-0 text-blue-600 border-1 border-blue-600 py-2 !px-5 rounded-xl text-lg font-medium  hover:bg-blue-600 hover:text-white transition"
                onClick={() => addToCart(product)}
                >
               {!clicked ? "Add to cart" : "In the cart"}
              </button>

              <button 
                className="bg-black text-white py-2 !px-5 rounded-xl text-lg font-medium shadow hover:!bg-blue-600 transition" 
                onClick={() => navigate("/chat", {
                  state: { sellerName }
                })}>
                Chat with Seller
              </button>
              </div>
              </div>
            </div>
            </SpotlightCard>
      </>
  )
}

export default ProductInfo