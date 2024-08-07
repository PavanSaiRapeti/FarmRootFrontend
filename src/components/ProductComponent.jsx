import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaCartPlus } from 'react-icons/fa';
import {
    fetchProductsRequest,
    addProductRequest,
    editProductRequest,
    deleteProductRequest,
    addToCart,
    removeFromCart
} from '../store/actions/farmActions/actions';
import { PayPalButtons } from '@paypal/react-paypal-js';
import FrButton from './common/FrButton';

const ProductComponent = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const cart = useSelector(state => state.products.cart);
    const userId = useSelector(state => state.auth.user._id); // Assuming user ID is stored in auth state
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '' , location: ''});
    const [editingProduct, setEditingProduct] = useState(null);
    const [showPayPal, setShowPayPal] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        dispatch(fetchProductsRequest());
    }, [dispatch]);

    const handleAddProduct = () => {
        dispatch(addProductRequest({ ...newProduct, userId }));
        setNewProduct({ name: '', description: '', price: '', image: '' });
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    const handleUpdateProduct = () => {
        dispatch(editProductRequest(editingProduct._id, editingProduct));
        setEditingProduct(null);
    };

    const handleDeleteProduct = (productId) => {
        dispatch(deleteProductRequest(productId));
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleCheckout = () => {
        const total = cart.reduce((sum, product) => sum + product.price, 0);
        setTotalAmount(total);
        setShowPayPal(true);
    };

    const handlePaymentSuccess = (details) => {
        console.log('Payment successful:', details);
        // Handle post-payment actions here
        setShowPayPal(false);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="border p-2 mr-2"
                />
                <FrButton onClick={handleAddProduct}>Add Product</FrButton>
            </div>
            {products.map((product) => (
                <div key={product._id} className="border p-4 mb-4">
                    {editingProduct && editingProduct._id === product._id ? (
                        <>
                            <input
                                type="text"
                                value={editingProduct.name}
                                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                className="border p-2 mr-2"
                            />
                            <input
                                type="text"
                                value={editingProduct.description}
                                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                className="border p-2 mr-2"
                            />
                            <input
                                type="number"
                                value={editingProduct.price}
                                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                className="border p-2 mr-2"
                            />
                            <input
                                type="text"
                                value={editingProduct.image}
                                onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                                className="border p-2 mr-2"
                            />
                            <FrButton onClick={handleUpdateProduct}>Update Product</FrButton>
                        </>
                    ) : (
                        <>
                            <h3 className="text-xl font-bold">{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="text-sm text-gray-500">${product.price}</p>
                            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover" />
                            <div className="flex space-x-2 mt-2">
                                {product.userId === userId && (
                                    <>
                                        <FaEdit onClick={() => handleEditProduct(product)} className="cursor-pointer" />
                                        <FaTrash onClick={() => handleDeleteProduct(product._id)} className="cursor-pointer" />
                                    </>
                                )}
                                <FaCartPlus onClick={() => handleAddToCart(product)} className="cursor-pointer" />
                            </div>
                        </>
                    )}
                </div>
            ))}
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            {cart.map((product) => (
                <div key={product._id} className="border p-4 mb-4">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="text-sm text-gray-500">${product.price}</p>
                    <img src={product.image} alt={product.name} className="w-32 h-32 object-cover" />
                    <FaTrash onClick={() => handleRemoveFromCart(product._id)} className="cursor-pointer" />
                </div>
            ))}
            {cart.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-xl font-bold">Total: ${totalAmount}</h3>
                    <FrButton onClick={handleCheckout}>Checkout</FrButton>
                    {showPayPal && <PayPalButtons amount={totalAmount} onSuccess={handlePaymentSuccess} />}
                </div>
            )}
        </div>
    );
};

export default ProductComponent;