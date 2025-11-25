import React, { createContext, useContext, useReducer } from 'react';

// Create Cart Context
const CartContext = createContext();

// Initial state for the cart
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

// Reducer function to handle cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);

      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: action.payload.quantity }];
      }

      const updatedTotalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
      const updatedTotalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      return {
        items: updatedItems,
        totalItems: updatedTotalItems,
        totalPrice: updatedTotalPrice
      };
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.productId !== action.payload);
      const updatedTotalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
      const updatedTotalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      return {
        items: updatedItems,
        totalItems: updatedTotalItems,
        totalPrice: updatedTotalPrice
      };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const updatedTotalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
      const updatedTotalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      return {
        items: updatedItems,
        totalItems: updatedTotalItems,
        totalPrice: updatedTotalPrice
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0
      };

    default:
      return state;
  }
};

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add to cart function
  const addToCart = (product) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productId: product.id || product.productId,
        name: product.name || product.title,
        price: product.price,
        image: product.image || product.img || product.picture,
        quantity: 1
      }
    });
  };

  // Remove from cart function
  const removeFromCart = (productId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId
    });
  };

  // Update quantity function
  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: {
        productId,
        quantity
      }
    });
  };

  // Clear cart function
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Process payment function
  const processPayment = async (paymentData) => {
    // In a real implementation, this would call your backend API
    // For now, we'll simulate a payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate payment processing result
        resolve({ success: true, transactionId: `txn_${Date.now()}` });
      }, 2000);
    });
  };

  // Context value to be shared
  const value = {
    items: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    processPayment
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};