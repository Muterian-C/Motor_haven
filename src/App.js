// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Signup from './components/Signup';
import Signin from './components/Signin';
import MakePayment from './components/MakePayment';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ChatBot from './components/ChatBot';
import Four from './components/404'
import Getproducts from './components/Getproducts';
import AddProduct from './components/AddProduct';

// Controls showing Navbar only on homepage
const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname === '/';

  return (
    <div className="min-vh-100 d-flex flex-column">
      {showNavbar && <Navbar />}
      <div className="flex-grow-1">
        <Routes>
          {/* Homepage: product grid */}
          <Route path="/" element={<Getproducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/addproducts" element={<AddProduct />} />
          <Route path="/makepayment" element={<MakePayment />} />
          <Route path='/chatbot' element={<ChatBot />}/>
          <Route path="*" element={<Four/>} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
};

export default App;