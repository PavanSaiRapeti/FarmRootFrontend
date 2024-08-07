import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FrButton from '../components/common/FrButton';
import { FaStar, FaCartPlus, FaInfoCircle } from 'react-icons/fa';
import ProductForm from './ProductForm';
import ProductComponent from './ProductComponent';
import { fetchProductsRequest } from '../store/actions/farmActions/actions';

const MarketplaceSection = ({products}) => {
  
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-center">Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-frWhite shadow-lg rounded-lg overflow-hidden">
              <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-frGreendark text-xl">${product.price}</p>
                <p className="text-frBlack">Quantity: {product.quantity}</p>
                <p className="text-frBlack mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-frBlack">Location: {product.location}</p>
                  <p className="text-frBlack">Created: {new Date(product.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-frGray">No products available</p>
        )}
      </div>
      <ProductForm/>
    </section>
  );
};

export default MarketplaceSection;