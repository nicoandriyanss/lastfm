import React, {Component} from 'react';
import './style.css';

import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/"></Link>
    </div>
  );
}

export default Navbar;