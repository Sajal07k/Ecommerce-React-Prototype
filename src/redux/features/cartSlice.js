import { createSlice } from '@reduxjs/toolkit'

// Function to load cart from localStorage
const loadCartFromLocalStorage = () => {
    try {
        const cartData = localStorage.getItem('cartItems');
        return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
        console.log("Error loading cart from localStorage:", error);
        return [];
    }
}

// Function to save cart to localStorage
const saveCartToLocalStorage = (item) => {
    try {
        const item = JSON.stringify(item);
        localStorage.setItem('cartItems', item);
    } catch (error) {
        console.log("Error saving cart to localStorage:", error);
    }
}

const initialState = {
    cartItems: loadCartFromLocalStorage(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
        // Check if the item is already in the cart
        const existingItem = state.cartItems.find((item) => item.id === action.payload.id);

        if(existingItem) {
            existingItem.quantity += 1;
        } else {
            state.cartItems.push({...action.payload, quantity: 1});
        }

        saveCartToLocalStorage(state.cartItems);
    },
    removeItemFromCart: (state, action) => {
        // Filter out the item by its ID
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
        saveCartToLocalStorage(state.cartItems);
    },
    updateItemQuantity: (state, action) => {
        const item = state.cartItems.find(item => item.id === action.payload.id);
        if(item) {
            item.quantity = action.payload.quantity;
            if(item.quantity <= 0) {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);    
            }
            saveCartToLocalStorage(state.cartItems);
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addItemToCart, removeItemFromCart, updateItemQuantity } = cartSlice.actions

export default cartSlice.reducer