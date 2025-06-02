// src/pages/Login.jsx
import React, { useState } from "react";
import AmbiolabLogo from "../components/AmbiolabLogo";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";



export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!correo || !password) {
      setError("Correo y contraseña son requeridos");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://189.136.55.203/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al iniciar sesión. Por favor verifica tus credenciales.");
        setMensaje("");
      } else {
        // Verifica que 'token' y 'user.tipo' estén en la respuesta
        if (data.token && data.user?.tipo !== undefined) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("tipo", data.user.tipo); // 👈 Aquí guardamos el tipo de usuario
          setMensaje(`Bienvenido ${data.user.nombre}`);
          navigate("/home", { replace: true });
        } else {
          setError("Respuesta del servidor incompleta. No se pudo obtener el tipo de usuario.");
        }
      }
    } catch (err) {
      setError("Error de conexión con el servidor. Por favor intenta nuevamente.");
      setMensaje("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <AmbiolabLogo className="logo" />
          <h2 className="login-title">Iniciar Sesión</h2>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              name="correo"
              type="email"
              autoComplete="email"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="tu@correo.com"
            />
          </div>

          <div className="input-group">
            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {error && <div className="error-message"><p>{error}</p></div>}
          {mensaje && <div className="success-message"><p>{mensaje}</p></div>}

          <div className="remember-forgot">
            <div className="remember-me">
              <input id="remember-me" name="remember-me" type="checkbox" />
              <label htmlFor="remember-me">Recordarme</label>
            </div>
            <a href="/contra" className="forgot-password">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" disabled={isLoading} className={`login-button ${isLoading ? "loading" : ""}`}>
            <span className={`spinner ${isLoading ? "" : "hidden"}`}></span>
            <span>{isLoading ? "Procesando..." : "Iniciar sesión"}</span>
          </button>
        </form>

        <div className="signup-link">
          ¿No tienes una cuenta? <a href="/registro">Regístrate</a>
        </div>
      </div>
    </div>
  );
}
