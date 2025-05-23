// src/navigation/NavBar.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
      }}
    >
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Inicio</h2>
        {/* Enlace a la página de pedidos */}
        <Link
          to="/pedidos"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Pedidos
        </Link>
      </div>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: 'white',
          color: '#007bff',
          border: 'none',
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default NavBar;
