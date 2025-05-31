import React, { useState, useEffect } from 'react';
import { useNavigate, Link, NavLink, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userTipo = localStorage.getItem("tipo");


  // Determina si estamos en la página de inicio
  const isHomePage = location.pathname === '/home';

  useEffect(() => {
    const handleScroll = () => {
      // Solo aplica scroll effect en home
      if (isHomePage) {
        setScrolled(window.scrollY > 10);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleLogout = async () => {
    try {
      localStorage.clear();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className={`navbar ${isHomePage ? (scrolled ? 'scrolled' : 'transparent') : 'solid'}`}>
      <div className="navbar-content">
        {/* Contenedor izquierdo con logo y enlaces */}
        <div className="navbar-left">
          <div>
            <Link to="/home" className="logo">
              <span className="logo-text">AMBIOLAB</span>
            </Link>
          </div>
          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <NavLink 
              to="/home" 
              className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
              end
            >
              Inicio
            </NavLink>
            {userTipo === '1' && (
  <NavLink 
    to="/pedidos" 
    className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
  >
    Pedidos
  </NavLink>
)}

          </div>
        </div>

        {/* Contenedor derecho con botón de logout */}
        <div className="navbar-right">
          <button onClick={handleLogout} className="logout-btn">
            <span className="logout-text">Cerrar Sesión</span>
          </button>
          
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;