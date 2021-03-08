import './header.css';

import React from 'react';
import Nav from '../nav/nav';
import Logo from '../logo/logo';

export default function Header() {
    return (
        <header>
          <div className="container">
            <Logo />
            <Nav />
          </div>
        </header>
    );
}
