import axios from "axios";

const API_BASE_URL = 'https://fakestoreapi.com/products';

// fetch only 10 products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}?limit=10`);
        return response.data;
    } catch (error) {
        console.log("Error fetching products:", error);
        return []; // Return an empty array on failure
    }
}

// fetch a single product by ID
export const fetchProductsById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error fetching product by ID:", error);
        return null;
    }
}