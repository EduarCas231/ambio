import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Registro from '../pages/Registro';
import EditI from '../pages/EditS';
import RegistroS from '../pages/RegistroS';
import Pedidos from '../pages/Pedidos';
import Contra from '../pages/Contra';


const isAuthenticated = () => !!localStorage.getItem('token');

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default function AppNavigator() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/contra" element={<Contra />} />

      {/* Ruta privada */}
      <Route 
        path="/home" 
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } 
      />
        <Route
        path='/editi/:id'
        element={
          <PrivateRoute>
            <EditI />
          </PrivateRoute>
        }
        />
        <Route
        path='/registroS'
        element={
          <PrivateRoute>
            <RegistroS />
          </PrivateRoute>
        }
        />

        <Route
        path='/pedidos'
        element={
          <PrivateRoute>
            <Pedidos />
          </PrivateRoute>
        }
        />

      {/* Redirigir cualquier otra ruta a login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
