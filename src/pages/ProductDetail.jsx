import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductsById } from '../api/products.js';
import { addItemToCart } from '../redux/features/cartSlice.js';

function ProductDetail() {
    // Get the 'id' parameter from the URL
    const { id } = useParams();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true);
                // Fetch product details using the ID from the route
                const item = await fetchProductsById(id);
                setProduct(item);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch product details.");
                setLoading(false);
            }
        }
        getProduct();
    }, [id]); // Rerun effect when 'id' changes

    const handleAddToCart = () => {
        if(product) {
            // Dispatch the action to add the product to the cart
            dispatch(addItemToCart(product));
            alert(`${product.title} added to cart!`);
        }
    };

    if(loading) return <p>Loading product details...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    if (!product) return <p>Product not found.</p>;

    const detailContainerStyle = {
        display: 'flex',
        gap: '40px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
    };

    const imgStyle = {
      maxWidth: '300px',
      height: '350px',
      objectFit: 'contain',
      border: '1px solid #eee',
      padding: '10px',
      borderRadius: '4px',
    };

    const buttonStyle = {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '15px',
      fontSize: '16px',
    };
    return (
        <div>
            <h2>Product Detail</h2>
            <div style={detailContainerStyle}>
                <img src={product.image} alt={product.title} style={imgStyle} />
                <div>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#B12704' }}>
                        ${product.price}
                    </p>
                    <button style={buttonStyle} onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
