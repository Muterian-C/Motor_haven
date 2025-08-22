// src/components/Navbar.js

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  // Calculate total quantity in cart

  const totalItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  useEffect(() => {
    // Load user data

    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);

      localStorage.removeItem("user"); // Clear corrupted data
    }

    // Load cart data (if you're storing it in localStorage)

    try {
      const storedCart = localStorage.getItem("cartItems");

      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart data from localStorage:", error);

      localStorage.removeItem("cartItems"); // Clear corrupted data
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cartItems"); // Optional: clear cart on logout
    setUser(null);
    setCartItems([]);
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav
      className="navbar navbar-expand-lg py-3 px-4 position-sticky top-0 z-3"
      style={{
        background: scrolled
          ? "rgba(15, 23, 42, 0.9)"
          : "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div className="container-fluid">
        {/* Brand / Home */}

        <Link
          to="/"
          className="navbar-brand me-4"
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.5px",
          }}
        >
          MOTOR HAVEN
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "1.5rem",
          }}
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Mobile toggle button */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex justify-content-between w-100 align-items-center">
            {/* Left side navigation */}

            <ul className="navbar-nav">
              <Link
                to="/"
                className="nav-link px-3 py-2 rounded-3"
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#3b82f6";
                  e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <i className="fas fa-home me-2"></i>Home
              </Link>

              {user && (
                <li className="nav-item">
                  <Link
                    to="/addproducts"
                    className="nav-link px-3 py-2 rounded-3"
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#3b82f6";
                      e.currentTarget.style.background =
                        "rgba(59, 130, 246, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <i className="fas fa-plus-circle me-2"></i>Add Products
                  </Link>
                </li>
              )}
            </ul>

            {/* Right side navigation */}

            <ul className="navbar-nav align-items-center">
              {/* Cart */}

              <li className="nav-item me-3">
                <Link  to="/cart"
                  className="btn position-relative me-3 px-3 py-2 rounded-3"
                  style={{
                    background: "rgba(16, 185, 129, 0.2)",
                    color: "rgba(16, 185, 129, 0.9)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(16, 185, 129, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(16, 185, 129, 0.2)";
                  }}
                >
                  <i className="bi bi-cart3 me-1"></i>
                  Cart
                  {totalItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalItems}

                      <span className="visually-hidden">items in cart</span>
                    </span>
                  )}
                </Link>
              </li>

              <li className="nav-item me-3">
                <Link to="/chatbot">
                              <button
                                className="btn position-relative me-3 px-3 py-2 rounded-3"
                                style={{
                                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                  fontSize: "0.6rem",
                                  padding: "0.35rem 0.5rem",
                                }}
                              >
                                {" "}
                                chat with us
                              </button>
                            </Link>
                
              </li>

              {/* User Authentication */}

              {user ? (
              <>
                <div
                  className="d-flex align-items-center me-3 px-3 py-1 rounded-3"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <i
                    className="fas fa-user-circle me-2"
                    style={{ color: "#3b82f6" }}
                  ></i>
                  <span
                    className="fw-semibold"
                    style={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "0.95rem",
                    }}
                  >
                    {user.username}
                  </span>
                </div>
                <button
                  className="btn px-4 py-2 rounded-3"
                  onClick={handleLogout}
                  style={{
                    background: "rgba(239, 68, 68, 0.2)",
                    color: "rgba(239, 68, 68, 0.9)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(239, 68, 68, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
                  }}
                >
                  <i className="fas fa-sign-out-alt me-2"></i>Logout
                </button>
              </>
            ) : (
                          <>
                            <Link
                              to="/signin"
                              className="btn px-4 py-2 rounded-3 me-3"
                              style={{
                                background: "rgba(59, 130, 246, 0.2)",
                                color: "rgba(59, 130, 246, 0.9)",
                                border: "1px solid rgba(59, 130, 246, 0.3)",
                                transition: "all 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(59, 130, 246, 0.3)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(59, 130, 246, 0.2)";
                              }}
                            >
                              <i className="fas fa-sign-in-alt me-2"></i>Sign In
                            </Link>
                            <Link
                              to="/signup"
                              className="btn px-4 py-2 rounded-3"
                              style={{
                                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                color: "white",
                                border: "none",
                                transition: "all 0.3s ease",
                                boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow =
                                  "0 6px 20px rgba(59, 130, 246, 0.4)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                  "0 4px 15px rgba(59, 130, 246, 0.3)";
                              }}
                            >
                              <i className="fas fa-user-plus me-2"></i>Sign Up
                            </Link>
                          </>
                        )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
