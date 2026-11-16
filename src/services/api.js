import placeholderImage from '../assets/hero-produtos.jpg';
import mockProducts from '../data/products.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export function normalizeProduct(product) {
  if (!product || typeof product !== 'object') {
    return null;
  }

  return {
    ...product,
    id: Number(product.id),
    name: product.name ?? product.nome ?? 'Produto',
    description: product.description ?? product.descricao ?? 'Descrição indisponível.',
    size: product.size ?? product.tamanho ?? 'Tamanho padrão',
    price: Number(product.price ?? product.preco ?? 0),
    category: product.category ?? product.categoria ?? 'geral',
    image: product.image ?? product.imagem ?? placeholderImage,
    tag: product.tag ?? 'Destaque',
  };
}

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const message = payload?.erro || payload?.error || payload?.message || 'Não foi possível completar a requisição.';
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return payload;
}

function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
}

function isBackendUnavailable(error) {
  return !Number.isInteger(error?.status) || error.status >= 500;
}

function filterMockProducts(filters = {}) {
  const search = normalizeText(filters.search || '');

  return mockProducts.filter((product) => {
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesSearch = !search || normalizeText(`${product.name} ${product.description}`).includes(search);
    return matchesCategory && matchesSearch;
  });
}

export async function fetchProducts(filters = {}) {
  const params = new URLSearchParams();

  if (filters.category) {
    params.set('categoria', filters.category);
  }

  if (filters.search) {
    params.set('busca', filters.search);
  }

  const query = params.toString();
  try {
    const data = await apiFetch(query ? `/produtos?${query}` : '/produtos');
    const items = Array.isArray(data) ? data : [];

    return items.map(normalizeProduct).filter(Boolean);
  } catch (error) {
    if (!isBackendUnavailable(error)) {
      throw error;
    }

    console.warn('API de produtos indisponível; usando catálogo demonstrativo local.', error);
    return filterMockProducts(filters);
  }
}

export async function fetchProductById(productId) {
  try {
    const data = await apiFetch(`/produtos/${productId}`);
    return normalizeProduct(data);
  } catch (error) {
    if (!isBackendUnavailable(error)) {
      throw error;
    }

    console.warn('API de produtos indisponível; usando catálogo demonstrativo local.', error);
    return mockProducts.find((product) => product.id === Number(productId)) || null;
  }
}

export async function registerUser(payload) {
  const data = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      nome: payload.nome,
      email: payload.email,
      cpf: payload.cpf,
      senha: payload.senha,
    }),
  });

  return data?.usuario || data;
}

export async function loginUser(payload) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: payload.email,
      senha: payload.senha,
    }),
  });

  return data;
}
