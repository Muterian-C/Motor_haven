import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./footer";
import Carousel from "./Carousel";
import { useCart } from "../context/CartContext";
// import NavBar from './NavBar'

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState("");
  const productsPerPage = 12;

  const navigate = useNavigate();
  const img_url = "https://muterian.pythonanywhere.com/static/images/";
  const { isInCart, getItemQuantity, getCartCount, addToCart} = useCart();

  const getproducts = async () => {
    setLoading("Please wait, retrieving products...");
    try {
      const response = await axios.get(
        "https://muterian.pythonanywhere.com/api/get_products_details"
      );
      setProducts(response.data);
      setLoading("");
    } catch (error) {
      setError(error.message);
      setLoading("");
    }
  };
 
  


  useEffect(() => {
    getproducts();
  }, []);

  // Filtered products
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };
  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`${product.product_name} added to cart!`);
  };
  const goToCart = ()=>{
    navigate("/cart")
  };

  return (
    <div
      className="min-vh-100"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)",
        minHeight: "100vh",
      }}
    >
      

      {/* Enhanced Hero Header */}
      <header
        className="position-relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
        }}
      >
        {/* Animated Background Elements */}
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <div
            className="position-absolute rounded-circle"
            style={{
              top: "10%",
              left: "10%",
              width: "300px",
              height: "300px",
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
              filter: "blur(60px)",
              animation: "pulse 4s ease-in-out infinite",
            }}
          ></div>
          <div
            className="position-absolute rounded-circle"
            style={{
              bottom: "10%",
              right: "10%",
              width: "400px",
              height: "400px",
              background:
                "radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)",
              filter: "blur(60px)",
              animation: "pulse 4s ease-in-out infinite 2s",
            }}
          ></div>
        </div>

        <div
          className="container position-relative text-center py-5"
          style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
        >
          <h1
            className="display-1 fw-black mb-4"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: "900",
              letterSpacing: "-0.02em",
            }}
          >
            MOTOR HAVEN 🚗
          </h1>
          <p
            className="fs-2 text-light mb-4"
            style={{ fontWeight: "300", letterSpacing: "0.1em" }}
          >
            Ride Bold. <span style={{ color: "#3b82f6" }}>Ride Free</span>
          </p>
          <div className="d-flex justify-content-center">
            <div
              style={{
                width: "100px",
                height: "4px",
                background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                borderRadius: "2px",
              }}
            ></div>
          </div>
        </div>
      </header>

      {/* Carousel Section with Enhanced Styling */}
      <section className="py-4">
        <div className="container">
          <div
            className="rounded-4 overflow-hidden shadow-lg"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Carousel />
          </div>
        </div>
      </section>

      {/* Enhanced Search Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-10">
              <div
                className="rounded-4 p-4 shadow-lg border-0"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <div className="text-center mb-4">
                  <h3 className="text-white mb-2 fs-1 fw-bold">
                    Find Your Perfect Ride
                  </h3>
                  <p className="text-light fs-5">
                    Discover premium motorcycles and accessories
                  </p>
                </div>

                <div className="position-relative mb-4">
                  <div className="position-absolute top-50 start-0 translate-middle-y ms-4">
                    <i className="fas fa-search text-light fs-5"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-lg border-0 shadow-none ps-5"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "20px",
                      color: "white",
                      fontSize: "1.1rem",
                      padding: "1rem 1rem 1rem 3.5rem",
                    }}
                    placeholder="Search motorcycles, parts, accessories..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                {/* View Mode Toggle */}
                <div className="d-flex justify-content-center">
                  <div
                    className="rounded-3 p-2"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`btn px-4 py-2 rounded-3 me-2 transition-all ${
                        viewMode === "grid"
                          ? "btn-primary shadow-lg"
                          : "btn-outline-light"
                      }`}
                      style={{
                        background:
                          viewMode === "grid"
                            ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                            : "transparent",
                        border:
                          viewMode === "grid"
                            ? "none"
                            : "1px solid rgba(255, 255, 255, 0.3)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <i className="fas fa-th me-2"></i>Grid View
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`btn px-4 py-2 rounded-3 transition-all ${
                        viewMode === "list"
                          ? "btn-primary shadow-lg"
                          : "btn-outline-light"
                      }`}
                      style={{
                        background:
                          viewMode === "list"
                            ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                            : "transparent",
                        border:
                          viewMode === "list"
                            ? "none"
                            : "1px solid rgba(255, 255, 255, 0.3)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <i className="fas fa-list me-2"></i>List View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-white">
                  <span className="fs-2 fw-bold" style={{ color: "#3b82f6" }}>
                    {filteredProducts.length}
                  </span>
                  <span className="fs-4 ms-2">
                    Product{filteredProducts.length !== 1 ? "s" : ""} Found
                  </span>
                </div>
                <div className="text-light">
                  Page{" "}
                  <span className="fw-bold" style={{ color: "#3b82f6" }}>
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="fw-bold" style={{ color: "#3b82f6" }}>
                    {totalPages}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Loading and Error States */}
          {loading && (
            <div className="row justify-content-center mb-5">
              <div className="col-md-6">
                <div
                  className="text-center p-4 rounded-4"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <div
                      className="spinner-border text-primary me-3"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="text-white fs-5">{loading}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="row justify-content-center mb-5">
              <div className="col-md-6">
                <div
                  className="text-center p-4 rounded-4"
                  style={{
                    background: "rgba(239, 68, 68, 0.2)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <i className="fas fa-exclamation-triangle text-danger me-3 fs-4"></i>
                    <span className="text-light fs-5">{error}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid/List */}
          {viewMode === "grid" ? (
            // Grid View
            <div className="row g-4">
              {currentProducts.length > 0
                ? currentProducts.map((product, index) => (
                    <div
                      className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
                      key={index}
                    >
                      <div
                        className="card h-100 border-0 shadow-lg position-relative overflow-hidden"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "24px",
                          transition: "all 0.5s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform =
                            "translateY(-10px) scale(1.02)";
                          e.currentTarget.style.background =
                            "rgba(255, 255, 255, 0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform =
                            "translateY(0) scale(1)";
                          e.currentTarget.style.background =
                            "rgba(255, 255, 255, 0.1)";
                        }}
                      >
                        <div
                          className="position-relative overflow-hidden"
                          style={{ borderRadius: "24px 24px 0 0" }}
                        >
                          <img
                            src={img_url + product.product_photo}
                            alt={product.product_name}
                            className="card-img-top"
                            style={{
                              height: "280px",
                              objectFit: "cover",
                              transition: "transform 0.5s ease",
                            }}
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div
                            className="d-none align-items-center justify-content-center text-white"
                            style={{
                              height: "280px",
                              background:
                                "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))",
                              fontSize: "4rem",
                            }}
                          >
                            🏍️
                          </div>
                          <div className="position-absolute top-0 end-0 m-3">
                            <span
                              className="badge px-3 py-2"
                              style={{
                                background: "rgba(34, 197, 94, 0.9)",
                                backdropFilter: "blur(10px)",
                                borderRadius: "12px",
                                fontSize: "0.8rem",
                              }}
                            >
                              <i className="fas fa-check-circle me-1"></i>
                              In Stock
                            </span>
                          </div>
                        </div>

                        <div className="card-body d-flex flex-column p-4">
                          <h5
                            className="card-title fw-bold mb-3 text-white"
                            style={{ fontSize: "1.3rem" }}
                          >
                            {product.product_name}
                          </h5>
                          <p
                            className="card-text text-light flex-grow-1 mb-4"
                            style={{ opacity: "0.8" }}
                          >
                            {product.product_description}
                          </p>

                          <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <span
                                className="h4 fw-bold mb-0"
                                style={{ color: "#fbbf24" }}
                              >
                                Ksh{" "}
                                {parseInt(
                                  product.product_cost
                                ).toLocaleString()}
                              </span>
                            </div>

                            <div className="d-flex gap-3">
                              <button
                                className="btn w-50 py-3 fw-semibold"
                                style={{
                                  background:
                                    "linear-gradient(135deg, #10b981, #34d399)",
                                  border: "none",
                                  borderRadius: "16px",
                                  color: "white",
                                  fontSize: "1rem",
                                  transition: "all 0.3s ease",
                                  boxShadow:
                                    "0 8px 25px rgba(16, 185, 129, 0.3)",
                                }}
                                onClick={() => handleAddToCart(product)}
                                onMouseEnter={(e) => {
                                  e.target.style.transform = "translateY(-2px)";
                                  e.target.style.boxShadow =
                                    "0 12px 35px rgba(16, 185, 129, 0.4)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.transform = "translateY(0)";
                                  e.target.style.boxShadow =
                                    "0 8px 25px rgba(16, 185, 129, 0.3)";
                                }}
                              >
                                {isInCart(product.product_id) ? (
                                  <>
                                    Added({getItemQuantity(product.product_id)})
                                  </>
                                ) : (
                                  <>Add To Cart</>
                                )}
                                <i className="fas fa-cart-plus me-2"></i>
                                
                              </button>

                              <button
                                className="btn w-50 py-3 fw-semibold"
                                style={{
                                  background:
                                    "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                  border: "none",
                                  borderRadius: "16px",
                                  color: "white",
                                  fontSize: "1rem",
                                  transition: "all 0.3s ease",
                                  boxShadow:
                                    "0 8px 25px rgba(59, 130, 246, 0.3)",
                                }}
                                onClick={() =>
                                  navigate("/makepayment", {
                                    state: { product },
                                  })
                                }
                                onMouseEnter={(e) => {
                                  e.target.style.transform = "translateY(-2px)";
                                  e.target.style.boxShadow =
                                    "0 12px 35px rgba(59, 130, 246, 0.4)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.transform = "translateY(0)";
                                  e.target.style.boxShadow =
                                    "0 8px 25px rgba(59, 130, 246, 0.3)";
                                }}
                              >
                                <i className="fas fa-shopping-cart me-2"></i>
                                Purchase Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : !loading && (
                    <div className="col-12">
                      <div className="text-center py-5">
                        <div
                          className="card border-0 shadow-lg mx-auto"
                          style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "24px",
                            maxWidth: "500px",
                          }}
                        >
                          <div className="card-body py-5">
                            <div
                              className="text-white mb-4"
                              style={{ fontSize: "4rem", opacity: "0.5" }}
                            >
                              🔍
                            </div>
                            <h4 className="text-white mb-3 fs-2">
                              No Products Found
                            </h4>
                            <p className="text-light mb-4">
                              Try adjusting your search terms or browse all
                              available products.
                            </p>
                            <button
                              className="btn btn-lg px-5 py-3"
                              style={{
                                background:
                                  "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                border: "none",
                                borderRadius: "16px",
                                color: "white",
                                transition: "all 0.3s ease",
                              }}
                              onClick={() => setSearchTerm("")}
                            >
                              <i className="fas fa-refresh me-2"></i>
                              Clear Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
            </div>
          ) : (
            // List View
            <div className="row g-4">
              {currentProducts.length > 0
                ? currentProducts.map((product, index) => (
                    <div className="col-12" key={index}>
                      <div
                        className="card border-0 shadow-lg overflow-hidden"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "24px",
                          transition: "all 0.5s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255, 255, 255, 0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255, 255, 255, 0.1)";
                        }}
                      >
                        <div className="row g-0">
                          <div className="col-md-4 position-relative">
                            <img
                              src={img_url + product.product_photo}
                              alt={product.product_name}
                              className="img-fluid w-100"
                              style={{
                                height: "250px",
                                objectFit: "cover",
                                borderRadius: "24px 0 0 24px",
                              }}
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                            <div
                              className="d-none align-items-center justify-content-center text-white"
                              style={{
                                height: "250px",
                                background:
                                  "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))",
                                fontSize: "4rem",
                                borderRadius: "24px 0 0 24px",
                              }}
                            >
                              🏍️
                            </div>
                            <div className="position-absolute top-0 end-0 m-3">
                              <span
                                className="badge px-3 py-2"
                                style={{
                                  background: "rgba(34, 197, 94, 0.9)",
                                  backdropFilter: "blur(10px)",
                                  borderRadius: "12px",
                                }}
                              >
                                <i className="fas fa-check-circle me-1"></i>
                                In Stock
                              </span>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="card-body p-4 d-flex flex-column justify-content-between h-100">
                              <div>
                                <h3
                                  className="card-title fw-bold text-white mb-3"
                                  style={{ fontSize: "1.8rem" }}
                                >
                                  {product.product_name}
                                </h3>
                                <p
                                  className="card-text text-light mb-4"
                                  style={{ fontSize: "1.1rem", opacity: "0.8" }}
                                >
                                  {product.product_description}
                                </p>
                              </div>

                              <div className="d-flex justify-content-between align-items-center">
                                <span
                                  className="h3 fw-bold"
                                  style={{ color: "#fbbf24" }}
                                >
                                  Ksh{" "}
                                  {parseInt(
                                    product.product_cost
                                  ).toLocaleString()}
                                </span>
                                <div className="d-flex gap-3">
                                  <button
                                    className="btn px-4 py-3 fw-semibold"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, #10b981, #34d399)",
                                      border: "none",
                                      borderRadius: "16px",
                                      color: "white",
                                      fontSize: "1rem",
                                      transition: "all 0.3s ease",
                                      boxShadow:
                                        "0 8px 25px rgba(16, 185, 129, 0.3)",
                                    }}
                                    onClick={() => handleAddToCart(product)}
                                    onMouseEnter={(e) => {
                                      e.target.style.transform =
                                        "translateY(-2px)";
                                      e.target.style.boxShadow =
                                        "0 12px 35px rgba(16, 185, 129, 0.4)";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.transform =
                                        "translateY(0)";
                                      e.target.style.boxShadow =
                                        "0 8px 25px rgba(16, 185, 129, 0.3)";
                                    }}
                                  >
                                    <i className="fas fa-cart-plus me-2"></i>
                                    
                                  </button>

                                  <button
                                    className="btn px-4 py-3 fw-semibold"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                      border: "none",
                                      borderRadius: "16px",
                                      color: "white",
                                      fontSize: "1rem",
                                      transition: "all 0.3s ease",
                                      boxShadow:
                                        "0 8px 25px rgba(59, 130, 246, 0.3)",
                                    }}
                                    onClick={() =>
                                      navigate("/makepayment", {
                                        state: { product },
                                      })
                                    }
                                    onMouseEnter={(e) => {
                                      e.target.style.transform =
                                        "translateY(-2px)";
                                      e.target.style.boxShadow =
                                        "0 12px 35px rgba(59, 130, 246, 0.4)";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.transform =
                                        "translateY(0)";
                                      e.target.style.boxShadow =
                                        "0 8px 25px rgba(59, 130, 246, 0.3)";
                                    }}
                                  >
                                    <i className="fas fa-shopping-cart me-2"></i>
                                    Purchase Now
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : !loading && (
                    <div className="col-12">
                      <div className="text-center py-5">
                        <div
                          className="card border-0 shadow-lg mx-auto"
                          style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "24px",
                            maxWidth: "500px",
                          }}
                        >
                          <div className="card-body py-5">
                            <div
                              className="text-white mb-4"
                              style={{ fontSize: "4rem", opacity: "0.5" }}
                            >
                              🔍
                            </div>
                            <h4 className="text-white mb-3 fs-2">
                              No Products Found
                            </h4>
                            <p className="text-light mb-4">
                              Try adjusting your search terms or browse all
                              available products.
                            </p>
                            <button
                              className="btn btn-lg px-5 py-3"
                              style={{
                                background:
                                  "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                border: "none",
                                borderRadius: "16px",
                                color: "white",
                                transition: "all 0.3s ease",
                              }}
                              onClick={() => setSearchTerm("")}
                            >
                              <i className="fas fa-refresh me-2"></i>
                              Clear Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
            </div>
          )}

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="row mt-5">
              <div className="col-12">
                <div className="d-flex justify-content-center">
                  <div
                    className="p-3 rounded-4"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <nav aria-label="Product pagination">
                      <ul className="pagination pagination-lg mb-0">
                        {/* Previous */}
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link border-0 me-2"
                            style={{
                              background: "transparent",
                              color: currentPage === 1 ? "#6b7280" : "white",
                              borderRadius: "12px",
                              padding: "12px 16px",
                              transition: "all 0.3s ease",
                            }}
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <i className="fas fa-chevron-left"></i>
                          </button>
                        </li>

                        {/* Page Numbers */}
                        {[...Array(totalPages)].map((_, index) => (
                          <li key={index} className="page-item me-2">
                            <button
                              className="page-link border-0"
                              style={{
                                background:
                                  currentPage === index + 1
                                    ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                                    : "transparent",
                                color: "white",
                                borderRadius: "12px",
                                padding: "12px 16px",
                                fontWeight:
                                  currentPage === index + 1 ? "bold" : "normal",
                                transition: "all 0.3s ease",
                              }}
                              onClick={() => paginate(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}

                        {/* Next */}
                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link border-0 me-2"
                            style={{
                              background: "transparent",
                              color:
                                currentPage === totalPages
                                  ? "#6b7280"
                                  : "white",
                              borderRadius: "12px",
                              padding: "12px 16px",
                              transition: "all 0.3s ease",
                            }}
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            <i className="fas fa-chevron-right"></i>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Floating Action Button for Cart */}
      {getCartCount() > 0 && (
        <button
          className="btn btn-gradient rounded-circle position-fixed shadow-lg"
          style={{
            bottom: "2rem",
            right: "2rem",
            width: "60px",
            height: "60px",
            zIndex: 1000,
          }}
          onClick={goToCart}
        >
          <div className="position-relative">
            🛒
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.7rem" }}
            >
              {getCartCount()}
            </span>
          </div>
        </button>
      )}

      <Footer />
    </div>
  );
};

export default Getproducts;
