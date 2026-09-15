import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Smartphone, Layers, LayoutDashboard, ExternalLink, Menu, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { useServiceHealth } from '../../hooks/useServiceHealth';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { mobileHealth, accountingHealth } = useServiceHealth();

  const isOnline = mobileHealth.status === 'UP' || accountingHealth.status === 'UP';

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Mobile Service', path: '/#mobile-service' },
    { label: 'Accounting Service', path: '/#accounting-service' },
    { label: 'Architecture', path: '/#architecture' },
    { label: 'Dashboard', path: '/dashboard' },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.includes('#')) {
      const id = path.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200/70 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-slate-900 tracking-tight text-lg leading-tight flex items-center gap-1.5">
              <span>NovaStack</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full border border-brand-200/60">
                Microservices
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Enterprise Hub</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isDash = link.path === '/dashboard';
            const isActive = location.pathname === link.path;

            if (link.path.includes('#')) {
              return (
                <a
                  key={link.label}
                  href={link.path}
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      handleNavClick(link.path);
                    }
                  }}
                  className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              );
            }

            return (
              <Link
                key={link.label}
                to={link.path}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-brand-600 bg-brand-50/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Status Pill & Primary CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 border border-slate-200/80 text-slate-700">
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
            <span>{isOnline ? 'Cluster Active' : 'Offline Mode'}</span>
            <span className="text-slate-400">|</span>
            <span className="text-[11px] text-slate-500">8081 & 8082</span>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm hover:shadow transition-all duration-200"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Open Portal</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => handleNavClick(link.path)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-brand-600 text-white font-medium rounded-xl shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Enter Management Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
