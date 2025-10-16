import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/features/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Dispatch the action to add the product to the cart
    dispatch(addItemToCart(product));
  }

  const cardStyle = {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const imgStyle = {
    maxWidth: "100%",
    height: "150px",
    objectFit: "contain",
    marginBottom: "10px",
  };

  const buttonStyle = {
    marginTop: "10px",
    padding: "8px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={cardStyle}>
      <img src={product.image} alt={product.title} style={imgStyle} />
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <Link to={`/product/${product.id}`}>
        <button style={buttonStyle} onClick={handleAddToCart}>Add to Cart</button>
      </Link>
    </div>
  )
}

export default ProductCard;
