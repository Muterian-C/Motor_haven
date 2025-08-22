import React, { createContext, useContext, useReducer } from "react";

// Action types

const CART_ACTIONS = {
  ADD_TO_CART: "ADD_TO_CART",

  REMOVE_FROM_CART: "REMOVE_FROM_CART",

  UPDATE_QUANTITY: "UPDATE_QUANTITY",

  CLEAR_CART: "CLEAR_CART",
};

// Cart reducer

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART:
      const existingItem = state.find(
        (item) => item.product_id === action.payload.product_id
      );

      if (existingItem) {
        return state.map((item) =>
          item.product_id === action.payload.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }

    case CART_ACTIONS.REMOVE_FROM_CART:
      return state.filter((item) => item.product_id !== action.payload);

    case CART_ACTIONS.UPDATE_QUANTITY:
      return state.map((item) =>
        item.product_id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case CART_ACTIONS.CLEAR_CART:
      return [];

    default:
      return state;
  }
};

// Create context

const CartContext = createContext();

// Cart provider component

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  // Add item to cart

  const addToCart = (product) => {
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,

      payload: product,
    });
  };

  // Remove item from cart

  const removeFromCart = (productId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,

      payload: productId,
    });
  };

  // Update item quantity

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);

      return;
    }

    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,

      payload: { productId, quantity },
    });
  };

  // Clear entire cart

  const clearCart = () => {
    dispatch({
      type: CART_ACTIONS.CLEAR_CART,
    });
  };

  // Check if item is in cart

  const isInCart = (productId) => {
    return cartItems.some((item) => item.product_id === productId);
  };

  // Get item quantity

  const getItemQuantity = (productId) => {
    const item = cartItems.find((item) => item.product_id === productId);

    return item ? item.quantity : 0;
  };

  // Get total number of items in cart

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total cost of items in cart

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product_cost * item.quantity,
      0
    );
  };

  const value = {
    cartItems,

    addToCart,

    removeFromCart,

    updateQuantity,

    clearCart,

    isInCart,

    getItemQuantity,

    getCartCount,

    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook to use cart context

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};

export default CartContext;
