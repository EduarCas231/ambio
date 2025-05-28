import React, { useEffect, useState } from 'react';
import NavBar from '../navigation/NavBar';
import { useNavigate } from 'react-router-dom';
import '../styles/Pedidos.css';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [localCompletados, setLocalCompletados] = useState(new Set());
  const navigate = useNavigate();

  const fetchPedidos = async () => {
    try {
      const response = await fetch('https://3.139.72.90/pedidos');
      if (!response.ok) throw new Error('Error al obtener pedidos');
      const newData = await response.json();
      
      setPedidos(prevPedidos => {
        // Verificar si hay cambios reales
        const idsPrevios = new Set(prevPedidos.map(p => p.id_pedidos));
        const nuevosIds = new Set(newData.map(p => p.id_pedidos));
        
        // Comprobar si los datos son iguales
        const sameLength = newData.length === prevPedidos.length;
        const sameContent = sameLength && newData.every(p => 
          idsPrevios.has(p.id_pedidos) && 
          JSON.stringify(p) === JSON.stringify(prevPedidos.find(prev => prev.id_pedidos === p.id_pedidos))
        );

        if (sameContent) {
          return prevPedidos; // No hay cambios, mantener estado actual
        }
        
        // Actualizar solo si hay cambios reales
        const pedidosMap = new Map(prevPedidos.map(p => [p.id_pedidos, p]));
        newData.forEach(newPedido => {
          pedidosMap.set(newPedido.id_pedidos, newPedido);
        });
        
        return Array.from(pedidosMap.values()).sort((a, b) => b.id_pedidos - a.id_pedidos);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      if (initialLoad) setInitialLoad(false);
    }
  };

  useEffect(() => {
    // Cargar datos iniciales
    fetchPedidos();

    // Configurar intervalo para actualización periódica (cada 5 segundos)
    const intervalId = setInterval(fetchPedidos, 5000);

    // Limpiar intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [initialLoad]);

  const handleNuevoRegistro = () => {
    navigate('/registros');
  };

  const handleActualizar = (id) => {
    navigate(`/edits/${id}`); 
  };

  const handleTerminarLocal = (id) => {
    setLocalCompletados(prev => new Set(prev).add(id));
  };

  const formatFecha = (fecha) => {
    if (!fecha) return '';
    const dateObj = new Date(fecha);
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

  const formatStatusText = (status) => {
    if (!status) return '';
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const calcularDiasRestantes = (fechaInicio, fechaFinal) => {
    if (!fechaInicio || !fechaFinal) return null;
    
    const hoy = new Date();
    const fechaFin = new Date(fechaFinal);
    const diffTime = fechaFin - hoy;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const getColorDiasRestantes = (dias) => {
    if (dias === null) return 'gray';
    if (dias < 0) return 'red';
    if (dias === 0) return 'gray';
    if (dias <= 3) return 'yellow';
    if (dias <= 5) return 'green';
    return 'blue';
  };

  const getColorEstatus = (estatus, isLocalCompleted) => {
    if (isLocalCompleted) return 'green';
    if (!estatus) return 'gray';
    switch(estatus.toLowerCase()) {
      case 'en proceso': return 'gray';
      case 'pendiente': return 'blue';
      case 'completado': return 'green';
      default: return 'gray';
    }
  };

  const columnas = ['nombre', 'norma', 'estatus', 'fecha_inicio', 'fecha_final', 'comentario'];

  return (
    <div>
      <NavBar />
      <div className="pedidos-container">
        <div className="pedidos-header">
          <h2 className="pedidos-title">Lista de Pedidos</h2>
          <button 
            className="pedidos-button pedidos-button-success"
            onClick={handleNuevoRegistro}
          >
            <span>+</span> Nuevo Registro
          </button>
        </div>

        {error && <p className="pedidos-error-message">{error}</p>}

        {initialLoad ? (
          <p className="pedidos-empty-message">Cargando pedidos...</p>
        ) : pedidos.length === 0 ? (
          <p className="pedidos-empty-message">No hay pedidos disponibles.</p>
        ) : (
          <table className="pedidos-table">
            <thead className="pedidos-table-header">
              <tr>
                {columnas.map((col) => (
                  <th key={col} className="pedidos-table-header-cell">
                    {formatColName(col)}
                  </th>
                ))}
                <th className="pedidos-table-header-cell">Días Restantes</th>
                <th className="pedidos-table-header-cell">Precio</th>
                <th className="pedidos-table-header-cell">Ultima modificación</th>
                <th className="pedidos-table-header-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => {
                const diasRestantes = calcularDiasRestantes(pedido.fecha_inicio, pedido.fecha_final);
                const isLocalCompleted = localCompletados.has(pedido.id_pedidos);
                const colorDias = getColorDiasRestantes(diasRestantes);
                const colorEstatus = getColorEstatus(pedido.estatus, isLocalCompleted);

                return (
                  <tr key={pedido.id_pedidos} className={`pedidos-table-row ${isLocalCompleted ? 'completed-row' : ''}`}>
                    {columnas.map((col) => (
                      <td key={col} className="pedidos-table-cell">
                        {col === 'estatus' ? (
                          <span className={`status-badge status-${colorEstatus}`}>
                            {formatStatusText(pedido[col])}
                          </span>
                        ) : col.includes('fecha') ? (
                          formatFecha(pedido[col])
                        ) : (
                          pedido[col]
                        )}
                      </td>
                    ))}
                    <td className="pedidos-table-cell">
                      {diasRestantes !== null ? (
                        <span className={`dias-badge dias-${colorDias}`}>
                          {diasRestantes < 0 ? 'Expirado' : diasRestantes === 0 ? 'Hoy' : `${diasRestantes} días`}
                        </span>
                      ) : 'N/A'}
                    </td>
                    <td className="pedidos-table-cell">
                      {formatPrecio(pedido.precio)}
                    </td>
                    <td className="pedidos-table-cell">
  {pedido.modificado_por_nombre
    ? `${pedido.modificado_por_nombre} ${pedido.modificado_por_app}`
    : 'N/A'}
</td>


                    <td className="pedidos-table-cell pedidos-action-cell">
                      <button
                        className="pedidos-button pedidos-button-warning"
                        onClick={() => handleActualizar(pedido.id_pedidos)}
                        disabled={isLocalCompleted}
                      >
                        🔄 Actualizar
                      </button>

                      {!isLocalCompleted && (
                        <button
                          className="pedidos-button pedidos-button-success"
                          onClick={() => handleTerminarLocal(pedido.id_pedidos)}
                        >
                          ✅ Terminar
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Pedidos;