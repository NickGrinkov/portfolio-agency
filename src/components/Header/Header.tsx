import React from 'react';
import "./Header.scss";
import Logo from "../Logo";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Logo />
        <span>Agency</span>
      </div>
      <nav className="header__nav">
        <a href="">About</a>
        <a href="">Services</a>
        <a href="">Pricing</a>
        <a href="">Blog</a>
      </nav>
      <button className="header__button button">CONTACT</button>
      <div className="header__info">
        <h1>Portfolio</h1>
        <p>
          Agency provides a full service range including technical skills,
          design, business understanding.
        </p>
      </div>
    </header>
  );
}

export default Header;