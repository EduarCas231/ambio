import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/RegistroS.css';

const RegistroS = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    norma: '',
    estatus: 'pendiente',
    fecha_inicio: '',
    fecha_final: '',
    comentario: '',
    precio: ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('https://189.136.55.203/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar el pedido');
      }

      navigate('/pedidos', { state: { success: 'Pedido registrado correctamente' } });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-header">
        <h2>Registrar Nuevo Pedido</h2>
        <button onClick={() => navigate('/pedidos')} className="back-button">
          Volver a Pedidos
        </button>
      </div>

      <div className="registro-card">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="registro-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre del Cliente <span className="required">*</span></label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingrese el nombre del cliente"
              required
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="norma">Norma</label>
            <input
              type="text"
              id="norma"
              name="norma"
              placeholder="Ingrese la norma aplicable"
              value={formData.norma}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="estatus">Estatus</label>
              <select 
                id="estatus" 
                name="estatus" 
                value={formData.estatus} 
                onChange={handleChange}
              >
                <option value="pendiente">Pendiente</option>
                <option value="en_proceso">En Proceso</option>
                <option value="completado">Completado</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="precio">Precio ($)</label>
              <input
                type="number"
                id="precio"
                name="precio"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.precio}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fecha_inicio">Fecha de Inicio</label>
              <input
                type="date"
                id="fecha_inicio"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fecha_final">Fecha Final</label>
              <input
                type="date"
                id="fecha_final"
                name="fecha_final"
                value={formData.fecha_final}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comentario">Comentarios</label>
            <textarea
              id="comentario"
              name="comentario"
              placeholder="Ingrese cualquier comentario relevante..."
              rows="4"
              value={formData.comentario}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registrando...' : 'Registrar Pedido'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroS;