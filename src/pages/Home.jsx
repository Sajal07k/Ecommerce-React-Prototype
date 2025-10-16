import React, { useState, useEffect } from 'react'
import { fetchProducts } from '../api/products.js'
import ProductCard from '../components/ProductCard.jsx'

function Home() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const item = await fetchProducts();
                setProducts(item);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch products.");
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    if(loading) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '20px',
    };

    return (
        <div>
            <h2>Available Products</h2>
            <div style={gridStyle}>
                {
                    products.map((product) => (
                        // Pass the product data to the reusable ProductCard
                        <ProductCard key={product.id} product={product}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Home
