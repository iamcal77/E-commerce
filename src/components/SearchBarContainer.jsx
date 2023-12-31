import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import { CartContext } from '../Authentication/CartContext';
import { Link, useNavigate } from 'react-router-dom';
// import CheckoutPage from './CheckoutPage';


const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 50%; /* Full width on mobile */
  max-width: 200px;
  height: auto;
  margin: 15px;
  padding: 15px;
  border: 1px solid #333;
  border-radius: 10px;

  @media (min-width: 768px) {
    /* Adjust to larger size on bigger screens */
    width: 200px;
  }

  img {
    max-width: 100%;
    max-height: 100px; /* Limit image height */
    height: auto;
    object-fit: contain; /* Ensure the entire image is visible */
  }

  h2 {
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
  }

  button {
    background-color: orange;
    color: white;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 2px 2px;
    cursor: pointer;
  }
`;


const StyledSearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: #f5f5f5;
  margin-bottom: 20px;
  position: relative;
`;

const Cart = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

const CartDrawer = styled.div`
  position: absolute;
  right: 0;
  top: 100%;

  width: 300px; 
  height: auto;
  background: lightgreen;

  padding: 20px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

function SearchBarContainer({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const { cartProducts, total } = useContext(CartContext); // Access cartProducts and total from CartContext
  const navigate = useNavigate();



  const handleProceedToCheckout = () => {
   navigate({
      pathname: "/checkout-details",
      state: {
        cartItems: cartProducts,
        totalAmount: total,
      },
    });
  };


  return (
    <StyledSearchBarContainer>
      <SearchBar onSearch={onSearch} />
      {/* <CheckoutPage /> */}

      <Cart onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faShoppingCart} />
        <span>{cartProducts.length}</span>
      </Cart>

      {isOpen && (
        <CartDrawer>
          <h2>Welcome Customer! 👋</h2>
          <h5>Sign in with UniCart to save your cart, save products for checkout and more!</h5>
          <p>Already a customer? <a href="/login">Login</a></p>
          {cartProducts.length > 0 ? (
            <div>
              {cartProducts.map((item) => (
                <ProductCard key={item.index}>
                  <img src={item.product_full_image} alt={item.product_name} />
                  <p>{item.product_name} - Ksh.{item.unit_price}</p>
                </ProductCard>
              ))}
              <div>
                <h4>Total: Ksh.{total}</h4>
              </div>
            </div>
          ) : (
            
            <h2>Cart Is Empty</h2>
          )}

          {/* Link to the CheckoutPage */}
          <Link to="/checkout-details">
          <button onClick={handleProceedToCheckout} disabled={cartProducts.length === 0}>
            Proceed to Checkout
          </button>
          </Link>
        </CartDrawer>
      )}
    </StyledSearchBarContainer>
  );
}

export default SearchBarContainer;
