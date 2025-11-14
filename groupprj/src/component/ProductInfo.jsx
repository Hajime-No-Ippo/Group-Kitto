import React from 'react'
import ProductGallery from './ProductGallery.jsx';

const ProductInfo = (props) => {
  const {product, addToCart} = props;
  if (!product) return <p>No product selected.</p>;

  return (
      <div className='container'>
       <h2>ProductDetail:</h2>
            <div key={product.id} className="product-detail">
              <h2>{product.name}</h2>
              <ProductGallery images={product.img || [product.img]}/> 
              <p>{product.description}</p>
              <ul>
                <li>Category: {product.category}</li>
                <li>Price: ${product.price}</li> 
                <li>Seller: {product.seller}</li>
                <li>Condition: {product.condition}</li>
                <li>Exchange For: {product.exchangeFor}</li>
              </ul>
              <button className = "" onClick={() => addToCart(product)}>Add to cart</button>
            </div>
      </div>
  )
}

export default ProductInfo