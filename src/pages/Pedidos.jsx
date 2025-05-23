import React, { useEffect, useState } from 'react';
import NavBar from '../navigation/NavBar';
import { useNavigate } from 'react-router-dom';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch('https://3.139.72.90/pedidos');
        if (!response.ok) throw new Error('Error al obtener pedidos');
        const data = await response.json();
        setPedidos(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPedidos();
  }, []);

  const handleNuevoRegistro = () => {
    navigate('/registros');
  };

  const handleEditar = (id) => {
    navigate(`/editi/${id}`);
  };

  // Función para formatear fecha y adelantar un día
  const formatFecha = (fecha) => {
    if (!fecha) return '';

    const dateObj = new Date(fecha);
    // Adelantar un día
    dateObj.setDate(dateObj.getDate() + 1);

    return dateObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrecio = (precio) => {
    if (precio === null || precio === undefined) return '';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(precio);
  };

  const formatColName = (col) => {
    return col
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Agregamos "comentario" a las columnas
  const columnas = ['nombre', 'norma', 'estatus', 'fecha_inicio', 'fecha_final', 'precio', 'comentario'];

  return (
    <div>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <h2>Lista de Pedidos</h2>
        <button
          onClick={handleNuevoRegistro}
          style={{
            marginBottom: '20px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Nuevo Registro
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {pedidos.length === 0 ? (
          <p>No hay pedidos disponibles.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {columnas.map((col) => (
                  <th
                    key={col}
                    style={{
                      border: '1px solid #ccc',
                      padding: '8px',
                      textAlign: 'left',
                      backgroundColor: '#f5f5f5'
                    }}
                  >
                    {formatColName(col)}
                  </th>
                ))}
                <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido, index) => (
                <tr key={index}>
                  {columnas.map((col, i) => (
                    <td key={i} style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {col.includes('fecha')
                        ? formatFecha(pedido[col])
                        : col === 'precio'
                        ? formatPrecio(pedido[col])
                        : pedido[col]}
                    </td>
                  ))}
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <button
                      onClick={() => handleEditar(pedido.id_pedidos)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#ffc107',
                        border: 'none',
                        color: '#000',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Pedidos;
