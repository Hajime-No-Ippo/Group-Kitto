import React from 'react'
import ProductGallery from './ProductGallery.jsx';

const ProductInfo = (props) => {
  const {product, addToCart} = props;
  if (!product) return <p>No product selected.</p>;

  return (
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto my-10">
       <h2>ProductDetail:</h2>
            <div className="flex-1 bg-gray-100 flex items-center justify-center p-6">
            <div key={product.id} >
              <h2>{product.name}</h2>
              <div className="w-full max-w-sm h-64 md:h-80 flex items-center justify-center">
                <ProductGallery images={product.img || [product.img]}/> 
              </div>
              </div>
              <p>{product.description}</p>
              <ul>
                <li className="font-semibold">Category: {product.category}</li>
                <li className="font-semibold">Price: ${product.price}</li> 
                <li className="font-semibold">Seller: {product.seller}</li>
                <li className="font-semibold">Condition: {product.condition}</li>
                <li className="font-semibold">Exchange For: {product.exchangeFor}</li>
              </ul>
              <button className = "" onClick={() => addToCart(product)}>Add to cart</button>
            </div>
      </div>
  )
}

export default ProductInfo