import React, { useState } from 'react';

const Navbar = ({ view, setView }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <header className="navbar">
      <div className="logo" onClick={() => setView('home')}>
        <img src="/images/logo.png" alt="logo" />
      </div>
      <button className="nav-toggle" onClick={() => setIsMenuVisible(!isMenuVisible)}>
        ☰
      </button>
      <nav className="nav">
        <ul className={`menu ${isMenuVisible ? 'nav-visible' : ''}`}>
          {['home', 'signin', 'register'].includes(view) ? (
            <>
              <li><a href="#services" onClick={() => setView('home')}>Services</a></li>
              <li><a href="#contact">Contact us</a></li>
              <li><button onClick={() => setView('signin')} className="nav-link-btn">Sign in</button></li>
              <li><button onClick={() => setView('register')} className="nav-link-btn">Register</button></li>
            </>
          ) : (
            <>
              <li><button onClick={() => setView('reports')} className="nav-link-btn">Reports</button></li>
              {/* Al hacer Sign out, volvemos al home */}
              <li><button onClick={() => setView('home')} className="nav-link-btn">Sign out</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;