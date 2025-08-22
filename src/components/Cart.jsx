import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";


const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  } = useCart();
  const [toast, setToast] = useState("");

  // Show toast notification
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }

    updateQuantity(productId, newQuantity);
    showToast("Cart updated!");
  };

  // Handle item removal
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    showToast("Item removed from cart");
  };

  // Handle checkout - simplified to handle all cart items
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showToast("Your cart is empty");
      return;
    }

    // Navigate to payment with all cart items
    navigate("/makepayment", {
      state: {
        cartItems: cartItems,
        totalAmount: getCartTotal(),
        isCartCheckout: true,
      },
    });
  };

  // Continue shopping
  const continueShopping = () => {
    navigate("/");
  };

  const img_url = "https://muterian.pythonanywhere.com/static/images/";

  return (
    <div 
      className="min-vh-100"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)'
      }}
    >
      {/* Header */}
      <div className="bg-black bg-opacity-20 backdrop-blur-sm border-bottom" style={{borderColor: 'rgba(255,255,255,0.1)'}}>
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h2 mb-2 text-white fw-bold">
                <span 
                  className="me-3"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  🛒
                </span>
                Shopping Cart
              </h1>
              <p className="text-light opacity-75 mb-0">
                {getCartCount()} {getCartCount() === 1 ? "item" : "items"} in your cart
              </p>
            </div>

            <button
              className="btn btn-outline-light px-4 py-2 rounded-pill"
              onClick={continueShopping}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* Empty Cart State */}
        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <i 
                className="bi bi-cart-x display-1"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              ></i>
            </div>
            <h3 className="mb-3 text-white">Your cart is empty</h3>
            <p className="text-light opacity-75 mb-4">
              Looks like you haven't added any bike to your cart yet.
            </p>

            <button
              className="btn btn-lg px-5 py-3 rounded-pill fw-semibold"
              onClick={continueShopping}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                border: 'none',
                color: 'white',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <i className="bi bi-palette me-2"></i>
              find your Ride
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {/* Cart Items */}
            <div className="col-lg-8">
              <div 
                className="rounded-4 overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div 
                  className="p-4 border-bottom"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 text-white fw-bold">Cart Items</h5>
                    <button
                      className="btn btn-sm text-white"
                      onClick={() => {
                        clearCart();
                        showToast("Cart cleared");
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      }}
                    >
                      <i className="bi bi-trash me-1"></i>
                      Clear Cart
                    </button>
                  </div>
                </div>

                <div className="p-0">
                  {cartItems.map((item, index) => (
                    <div 
                      key={item.product_id} 
                      className={`p-4 ${index !== cartItems.length - 1 ? 'border-bottom' : ''}`}
                      style={{borderColor: 'rgba(255, 255, 255, 0.1)'}}
                    >
                      <div className="row align-items-center g-3">
                        {/* Product Image */}
                        <div className="col-md-3">
                          <img
                            src={img_url + item.product_photo}
                            alt={item.product_name}
                            className="img-fluid rounded-3"
                            style={{
                              height: "120px",
                              objectFit: "cover",
                              width: "100%",
                              border: '2px solid rgba(255, 255, 255, 0.1)'
                            }}
                            onError={(e) => {
                              // Fallback gradient if image fails to load
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = `
                                <div style="
                                  height: 120px;
                                  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
                                  display: flex;
                                  align-items: center;
                                  justify-content: center;
                                  border-radius: 12px;
                                  color: white;
                                  font-size: 2rem;
                                ">🎨</div>
                              `;
                            }}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="col-md-4">
                          <h6 className="mb-2 text-white fw-semibold">{item.product_name}</h6>
                          <p className="text-light opacity-75 small mb-2">
                            {item.product_description?.substring(0, 80)}...
                          </p>
                          <div 
                            className="fw-bold"
                            style={{
                              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }}
                          >
                            Ksh{item.product_cost}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="col-md-3">
                          <label className="form-label small text-light opacity-75">Quantity</label>
                          <div className="input-group input-group-sm">
                            <button
                              className="btn"
                              onClick={() =>
                                handleQuantityChange(item.product_id, item.quantity - 1)
                              }
                              style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                              }}
                            >
                              <i className="bi bi-dash"></i>
                            </button>

                            <input
                              type="number"
                              className="form-control text-center text-white"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.product_id,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              min="1"
                              max="10"
                              style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderLeft: 'none',
                                borderRight: 'none'
                              }}
                            />

                            <button
                              className="btn"
                              onClick={() =>
                                handleQuantityChange(item.product_id, item.quantity + 1)
                              }
                              style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                              }}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </div>

                        {/* Item Total & Remove */}
                        <div className="col-md-2 text-end">
                          <div className="fw-bold mb-2 text-white">
                            Ksh{(item.product_cost * item.quantity).toFixed(2)}
                          </div>
                          <button
                            className="btn btn-sm"
                            onClick={() => handleRemoveItem(item.product_id)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              color: '#ef4444',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                            }}
                          >
                            <i className="bi bi-trash">remove</i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-lg-4">
              <div
                className="rounded-4 overflow-hidden sticky-top"
                style={{
                  top: "20px",
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div 
                  className="p-4"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)'
                  }}
                >
                  <h5 className="mb-0 text-white fw-bold">Order Summary</h5>
                </div>

                <div className="p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-light opacity-75">Subtotal ({getCartCount()} items):</span>
                    <span className="text-white fw-semibold">Ksh{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-light opacity-75">Shipping:</span>
                    <span className="text-success fw-semibold">Free</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-light opacity-75">Tax:</span>
                    <span className="text-white fw-semibold">Ksh0.00</span>
                  </div>
                  <hr style={{borderColor: 'rgba(255, 255, 255, 0.2)'}} />
                  <div className="d-flex justify-content-between mb-4">
                    <strong className="text-white">Total:</strong>
                    <strong 
                      className="fs-5"
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      Ksh{getCartTotal().toFixed(2)}
                    </strong>
                  </div>

                  <button
                    className="btn btn-lg w-100 mb-3 py-3 fw-semibold rounded-3"
                    onClick={handleCheckout}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                      border: 'none',
                      color: 'white',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <i className="bi bi-credit-card me-2"></i>
                    Proceed to Checkout
                  </button>

                  <button
                    className="btn w-100 py-2 rounded-3"
                    onClick={continueShopping}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Continue Shopping
                  </button>

                  {/* Shipping Info */}
                  <div 
                    className="mt-4 p-3 rounded-3"
                    style={{
                      background: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.2)'
                    }}
                  >
                    <h6 className="mb-2 text-success">
                      <i className="bi bi-truck me-2"></i>
                      Free Shipping
                    </h6>
                    <small className="text-light opacity-75">
                      Your order qualifies for free shipping. Estimated
                      delivery: 3-5 business days.
                    </small>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-3 text-center">
                    <small className="text-light opacity-75">
                      <i className="bi bi-shield-check text-success me-1"></i>
                      Secure checkout guaranteed
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className="position-fixed top-0 end-0 m-3"
          style={{ zIndex: 1050 }}
        >
          <div 
            className="toast show p-0 border-0 rounded-4 overflow-hidden"
            role="alert"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              minWidth: '300px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div 
              className="toast-header text-white border-0"
              style={{
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                padding: '12px 16px'
              }}
            >
              <i className="bi bi-check-circle me-2"></i>
              <strong className="me-auto">Success!</strong>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setToast("")}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  opacity: 0.8
                }}
              ></button>
            </div>
            <div className="toast-body text-white" style={{ padding: '16px' }}>
              {toast}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;