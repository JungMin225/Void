// src/components/Header.jsx
import React from "react";

function Header({ onNavClick }) {
  return (
    <header className="site-header">
      <div className="header-left">VØID</div>

      <nav className="header-nav">
        <button onClick={() => onNavClick("intro")}>메인</button>
        <button onClick={() => onNavClick("sutra")}>불경 문장</button>
        <button onClick={() => onNavClick("monk")}>스님 법문</button>
        <button onClick={() => onNavClick("terms")}>불교 용어</button>
      </nav>
    </header>
  );
}

export default Header;
