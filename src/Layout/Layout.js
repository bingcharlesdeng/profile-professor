import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div className="app-container">
      <NavBar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;