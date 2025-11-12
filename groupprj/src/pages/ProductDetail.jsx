import React from 'react'
import Products from '../Data/ProductData'
 
export const ProductDetail = () => {
    
  return (
    <>
    <div className='container'>
       ProductDetail:
        {Products.map((product) => {
          return (
            <div key={Products.id} className="product-detail">
              <h2>{Products.name}</h2>
              <img src={product.imageUrl} alt={product.name} />
              <p>{Products.description}</p>
              <ul>
                <li>Category: {Products.category}</li>
                <li>Price: ${Products.price}</li>
                <li>Condition: {Products.condition}</li>
                <li>Exchange For: {Products.exchangeFor}</li>
              </ul>
            </div>
          )
        }
        )}
      </div>
    </>
  )
}
