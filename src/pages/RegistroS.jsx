import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://189.136.55.203/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el pedido');
      }

      // Navegar a la lista de pedidos después del registro
      navigate('/pedidos');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Registrar Nuevo Pedido</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
        <input type="text" name="nombre" placeholder="Nombre" required onChange={handleChange} />
        <input type="text" name="norma" placeholder="Norma" onChange={handleChange} />
        <select name="estatus" onChange={handleChange} defaultValue="pendiente">
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En Proceso</option>
          <option value="completado">Completado</option>
        </select>
        <input type="date" name="fecha_inicio" onChange={handleChange} />
        <input type="date" name="fecha_final" onChange={handleChange} />
        <textarea name="comentario" placeholder="Comentario" onChange={handleChange} />
        <input type="number" name="precio" step="0.01" placeholder="Precio" onChange={handleChange} />

        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegistroS;
