import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditS = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  // Formatea fechas tipo "2023-05-23T00:00:00Z" a "2023-05-23"
  const formatDateInput = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date)) return '';
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await fetch(`https://189.136.55.203/pedidos/${id}`);
        if (!response.ok) throw new Error('Error al obtener el pedido');

        const data = await response.json();

        setFormData({
          nombre: data.nombre ?? '',
          norma: data.norma ?? '',
          estatus: data.estatus ?? 'pendiente',
          fecha_inicio: formatDateInput(data.fecha_inicio),
          fecha_final: formatDateInput(data.fecha_final),
          comentario: data.comentario ?? '',
          precio: data.precio !== null && data.precio !== undefined ? data.precio : ''
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPedido();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`https://189.136.55.203/pedidos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Error al actualizar el pedido');

      navigate('/pedidos');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Editar Pedido</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          required
          value={formData.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="norma"
          placeholder="Norma"
          value={formData.norma}
          onChange={handleChange}
        />
        <select name="estatus" value={formData.estatus} onChange={handleChange}>
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En Proceso</option>
          <option value="completado">Completado</option>
        </select>
        <input
          type="date"
          name="fecha_inicio"
          value={formData.fecha_inicio}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fecha_final"
          value={formData.fecha_final}
          onChange={handleChange}
        />
        <textarea
          name="comentario"
          placeholder="Comentario"
          value={formData.comentario}
          onChange={handleChange}
        />
        <input
          type="number"
          name="precio"
          step="0.01"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
        />
        <button
          type="submit"
          style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditS;
