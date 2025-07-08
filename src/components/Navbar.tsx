import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import beeLogo from '@/assets/bee-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/programs', label: 'Programs' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-40 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src={beeLogo} 
              alt="Bumblebee Preschool" 
              className="w-10 h-10 group-hover:animate-wiggle transition-transform"
            />
            <div className="hidden sm:block">
              <h1 className="font-baloo font-bold text-xl text-primary">
                Bumblebee Preschool
              </h1>
              <p className="text-xs text-muted-foreground font-comic">
                Where little minds blossom
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-full font-comic font-medium transition-all duration-300 hover:scale-105 ${
                  isActive(link.href)
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'text-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              asChild
              className="bg-gradient-primary font-comic font-bold text-primary-foreground hover:scale-105 transition-transform duration-300 shadow-glow animate-glow"
            >
              <Link to="/contact">Join Our Hive! 🐝</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg font-comic font-medium transition-all ${
                    isActive(link.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-primary/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button 
                asChild
                className="mx-4 mt-4 bg-gradient-primary font-comic font-bold"
              >
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Join Our Hive! 🐝
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;