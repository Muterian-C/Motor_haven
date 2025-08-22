import React from 'react';

const Footer = () => {
  return (
    <footer
      className="text-white mt-5"
      style={{
        background: 'linear-gradient(135deg, #1e293b, #334155)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="container py-5">
        <div className="row gy-4">
          {/* About Us */}
          <div className="col-md-4">
            <h4 className="fw-bold mb-3 text-gradient">About Us</h4>
            <p style={{ opacity: 0.9 }}>
              At <strong>MotoHaven</strong>, we’re passionate about two wheels and open roads. We connect riders with high-quality new and used motorbikes from top global brands. Whether you're after speed, style, or touring comfort, we’ve got the ride for you. With secure online shopping, expert support, and nationwide delivery, we make it easy to gear up and hit the road.
            </p>
          </div>

          {/* Contact Us */}
          <div className="col-md-4">
            <h4 className="fw-bold mb-3 text-gradient">Contact Us</h4>
            <form>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Your Email"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px'
                }}
              />
              <textarea
                className="form-control mb-3"
                rows="4"
                placeholder="Leave your comment"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px'
                }}
              ></textarea>
              <input
                type="submit"
                value="Send"
                className="btn w-100"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </form>
          </div>

          {/* Social Links */}
          <div className="col-md-4">
            <h4 className="fw-bold mb-3 text-gradient">Stay Connected</h4>
            <div className="mb-3 d-flex gap-3">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <img src="images/x.png" alt="X" style={{ width: '32px' }} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="images/fb.png" alt="Facebook" style={{ width: '32px' }} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="images/in.png" alt="Instagram" style={{ width: '32px' }} />
              </a>
            </div>
            <p style={{ opacity: 0.9 }}>
              Stay connected and reach out to us on our socials above—just a click away.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="text-center py-3"
        style={{
          background: 'rgba(0, 0, 0, 0.3)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '0.9rem'
        }}
      >
        &copy; 2025 <strong>MuterianC</strong>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
