import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Registro from '../pages/Registro';
import EditI from '../pages/EditS';
import RegistroS from '../pages/RegistroS';
import Pedidos from '../pages/Pedidos';
import Contra from '../pages/Contra';
import News from '../pages/News';

// Verifica si el usuario tiene token
const isAuthenticated = () => !!localStorage.getItem('token');

// Ruta privada normal (requiere estar logueado)
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

// Ruta solo para usuarios tipo 1 (admin)
function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const tipo = localStorage.getItem('tipo'); // tipo debe guardarse al iniciar sesión
  return token && tipo === '1' ? children : <Navigate to="/home" replace />;
}

export default function AppNavigator() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/contra" element={<Contra />} />

      {/* Rutas privadas normales */}
      <Route 
        path="/home" 
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } 
      />
      <Route
        path="/edits/:id"
        element={
          <PrivateRoute>
            <EditI />
          </PrivateRoute>
        }
      />
      <Route
        path="/registroS"
        element={
          <PrivateRoute>
            <RegistroS />
          </PrivateRoute>
        }
      />
      <Route
        path="/news"
        element={
          <PrivateRoute>
            <News />
          </PrivateRoute>
        }
      />

      {/* Ruta privada solo para tipo 1 */}
      <Route
        path="/pedidos"
        element={
          <AdminRoute>
            <Pedidos />
          </AdminRoute>
        }
      />

      {/* Redirigir cualquier otra ruta a login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
