// Configuración de URLs de API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://189.136.67.84';

const API = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    verify: `${API_BASE_URL}/auth/verify`,
  },
  pedidos: {
    getAll: `${API_BASE_URL}/pedidos`,
    getById: (id) => `${API_BASE_URL}/pedidos/${id}`,
    create: `${API_BASE_URL}/pedidos`,
    update: (id) => `${API_BASE_URL}/pedidos/${id}`,
    delete: (id) => `${API_BASE_URL}/pedidos/${id}`,
  },
  news: {
    getAll: `${API_BASE_URL}/news`,
    getById: (id) => `${API_BASE_URL}/news/${id}`,
    create: `${API_BASE_URL}/news`,
    update: (id) => `${API_BASE_URL}/news/${id}`,
    delete: (id) => `${API_BASE_URL}/news/${id}`,
  },
  visitas: {
  getAll: `${API_BASE_URL}/visitam`,
  getById: (id) => `${API_BASE_URL}/visitam/${id}`,
  getByCode: (codigo) => `${API_BASE_URL}/visitam/codigo/${encodeURIComponent(codigo)}`, // ← Agregado
  create: `${API_BASE_URL}/visitam`,
  update: (id) => `${API_BASE_URL}/visitam/${id}`,
  delete: (id) => `${API_BASE_URL}/visitam/${id}`,
}
};

export default API;
