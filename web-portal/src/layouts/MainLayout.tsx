import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-brand-500 selection:text-white">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      {!isDashboard && <Footer />}
    </div>
  );
};
