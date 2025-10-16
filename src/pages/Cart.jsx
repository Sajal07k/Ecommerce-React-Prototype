import React from 'react'
import { removeItemFromCart, updateItemQuantity } from '../redux/features/cartSlice'
import { useDispatch, useSelector } from 'react-redux';

function Cart() {
    // Get cart items from Redux store
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeItemFromCart({id}));
    }

    const handleQuantityChange = (id, newQty) => {
        const qty = parseInt(newQty, 10);
        // Dispatch action to update item quantity
        dispatch(updateItemQuantity({id, qty}));
    }

    const calculateTotal = () => {
        return cartItems.reduce((total, prod) => total + prod.price * prod.quantity, 0).toFixed(2);
    }

    const cartItemStyle = {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        padding: '10px 0',
    };

    const removeButtonStyle = {
      marginLeft: '20px',
      padding: '5px 10px',
      backgroundColor: '#ff4d4d',
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
    };

    const quantityInputStyle = {
      width: '40px',
      marginLeft: '10px',
      textAlign: 'center',
    };

    return (
        <div>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty. Go add some products!</p>
            ) : (
                <>
                    {cartItems.map((prod) => (
                        <div key={prod.id} style={cartItemStyle}>
                            <img src={prod.image}
                                 alt={prod.title} 
                                 style={{ width: '60px', height: '60px', objectFit: 'contain', marginRight: '20px' }}
                            />
                            <div style={{ flexGrow: 1 }}>
                                <h4>{prod.title}</h4>
                                <p>
                                    **Price:** ${prod.price.toFixed(2)}
                                </p>
                            </div>
                            <div>
                                <label>
                                    Quantity:
                                    <input
                                        type="number"
                                        value={prod.quantity}
                                        onChange={(e) => handleQuantityChange(prod.id, e.target.value)}
                                        style={quantityInputStyle}
                                    />
                                    <p style={{ fontWeight: 'bold', marginLeft: '20px' }}>
                                        Subtotal: ${(prod.price * prod.quantity).toFixed(2)}
                                    </p>  
                                    <button
                                        onClick={() => handleRemove(prod.id)}
                                        style={removeButtonStyle}
                                    >
                                        Remove
                                    </button>
                                </label>
                            </div>
                        </div>
                    ))}
                    <h3 style={{ marginTop: '20px', textAlign: 'right', borderTop: '2px solid #333', paddingTop: '10px' }}>
                        Grand Total: ${calculateTotal()}
                    </h3>
                </>
            )}
        </div>
    )
}

export default Cart
