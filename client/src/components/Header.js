import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const cartItemsCount = 0; // Placeholder, will be connected to state management later

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search for:', searchQuery);
      // Handle search navigation later
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-text">E-Shop</span>
        </Link>

        {/* Search Bar */}
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search products"
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <span className="search-icon">🔍</span>
          </button>
        </form>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link to="/signin" className="sign-in-link">
            Sign In
          </Link>

          {/* Cart Icon with Badge */}
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
