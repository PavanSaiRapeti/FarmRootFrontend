import React, { useEffect, useState } from 'react';
import FrButton from '../components/common/FrButton';
import { useDispatch } from 'react-redux';
import { addProductRequest, fetchProductsRequest } from '../store/actions/farmActions/actions';

const ProductForm = () => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
    location: "",
  });
  const [errors, setErrors] = useState({});

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };
   useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [newProduct]);

  const validateForm = () => {
      const newErrors = {};
      if (!newProduct.name) newErrors.name = 'Product name is required';
      if (!newProduct.price) newErrors.price = 'Price is required';
      if (!newProduct.quantity) newErrors.quantity = 'Quantity is required';
      if (!newProduct.description) newErrors.description = 'Description is required';
      if (!newProduct.location) newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
       dispatch(addProductRequest(newProduct));
       setNewProduct(newProduct);
    }
  };

  return (
    <section className="bg-frWhite py-8 mt-8 rounded-lg shadow-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">List a New Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="p-2 border rounded-lg w-full"
              value={newProduct.name}
              onChange={handleProductChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="col-span-1 md:col-span-2">
            <input
              type="text"
              name="price"
              placeholder="Price"
              className="p-2 border rounded-lg w-full"
              value={newProduct.price}
              onChange={handleProductChange}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
          <div className="col-span-1 md:col-span-2">
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              className="p-2 border rounded-lg w-full"
              value={newProduct.quantity}
              onChange={handleProductChange}
            />
            {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
          </div>
          <div className="col-span-1 md:col-span-2">
            <input
              type="text"
              name="image"
              placeholder="Image URL (Optional)"
              className="p-2 border rounded-lg w-full"
              value={newProduct.image}
              onChange={handleProductChange}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="p-2 border rounded-lg w-full"
              value={newProduct.description}
              onChange={handleProductChange}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          <div className="col-span-1 md:col-span-2">
            <input
              type="text"
              name="location"
              placeholder="enter location with time and date"
              className="p-2 border rounded-lg w-full"
              value={newProduct.location}
              onChange={handleProductChange}
            />
          </div>
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          <div className="col-span-1 md:col-span-2">
            <FrButton width={8} text="Add Product" type="submit" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProductForm;