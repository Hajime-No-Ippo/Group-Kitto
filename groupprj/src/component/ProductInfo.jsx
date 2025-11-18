import React from 'react'
import ProductGallery from './ProductGallery.jsx';
import { useNavigate } from 'react-router-dom';

const ProductInfo = (props) => {
  const {product, addToCart} = props;
  const navigate = useNavigate();
  if (!product) return <p>No product selected.</p>;

  return (
    <>
    <h2 className="font-semibold m-4">ProductDetail:</h2>
      <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden">
          
        <div className="w-1/2 bg-gray-100">
            <div key={product.id} className="w-full h-full scale-[1] !object-bottom">
              {/* LEFT: Product Image */}
              <ProductGallery images={product.img || [product.img]}/> 
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
                <li className="font-light text-lg">Seller: {product.seller}</li>
              </ul>

              <div className="flex mt-6 space-x-1.5">
              <button 
                className="!bg-blue-600 !text-white !py-3 !px-5 rounded-xl text-lg font-medium shadow-md hover:!bg-green-700 transition"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>

              <button 
                className="bg-black text-white py-2 !px-5 rounded-xl text-lg font-medium shadow hover:!bg-green-700 transition" 
                onClick={() => navigate("/chat", {
                state: { seller: product.seller }
                })}>
                Chat with Seller
              </button>
              </div>
              </div>
            </div>
      </div>
      </>
  )
}

export default ProductInfo