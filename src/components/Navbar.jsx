import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Navbar() {
    // Get the cart items from the Redux store
    const cartItems = useSelector((state) => state.cart.cartItems);

    // Calculate total count: sum of all item quantities
    const totalItems = cartItems.reduce((accum, item) => accum + item.quantity, 0);

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: 'white',
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        fontSize: '18px',
        padding: '0 15px',
    };


    return (
        <nav style={navStyle}>
            <Link to="/" style={linkStyle}>
                🏠 Home
            </Link>
            <div style={{ fontWeight: 'bold' }}>Demo Clothing Store</div>
            <Link to="/cart" style={linkStyle}>
                🛒 Cart ({totalItems})
            </Link>
        </nav>
    )
}

export default Navbar
