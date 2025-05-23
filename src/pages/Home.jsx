// src/pages/Home.jsx
import React from 'react';
import NavBar from '../navigation/NavBar';

const Home = () => {
  return (
    <div>
      <NavBar /> {/* Solo se importa y usa */}
      
      {/* Contenido principal */}
      <div style={{ padding: 20 }}>
        <h3>Bienvenido a la página principal</h3>
        <p>Este es el contenido de Home.</p>
      </div>
    </div>
  );
};

export default Home;
