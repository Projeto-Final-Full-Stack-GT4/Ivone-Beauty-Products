import placeholderImage from '../assets/hero-produtos.jpg';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1').replace(/\/+$/, '');
const API_BASE_URL = `${API_URL}/`;

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
    image: resolveProductImage(product.image ?? product.imagem),
    tag: product.tag ?? 'Destaque',
  };
}

function resolveProductImage(image) {
  if (!image) {
    return placeholderImage;
  }

  try {
    const imageUrl = new URL(image, API_BASE_URL);
    if (!['http:', 'https:'].includes(imageUrl.protocol)) {
      throw new Error('Protocolo de imagem inválido.');
    }
    return imageUrl.toString();
  } catch {
    throw new Error('A imagem do produto possui uma URL inválida.');
  }
}

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
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

export async function fetchProducts(filters = {}) {
  const params = new URLSearchParams();

  if (filters.category) {
    params.set('categoria', filters.category);
  }

  if (filters.search) {
    params.set('busca', filters.search);
  }

  params.set('limit', '100');
  const products = [];
  let totalPages;

  for (let page = 1; totalPages === undefined || page <= totalPages; page += 1) {
    params.set('page', String(page));
    const data = await apiFetch(`/produtos?${params.toString()}`);

    if (!data || !Array.isArray(data.produtos) || !Number.isInteger(data.totalPaginas)) {
      throw new Error('A API retornou uma resposta inválida para a lista de produtos.');
    }
    if (totalPages !== undefined && data.totalPaginas !== totalPages) {
      throw new Error('A paginação dos produtos mudou durante o carregamento.');
    }

    totalPages = data.totalPaginas;
    const pageProducts = data.produtos.map(normalizeProduct);
    if (pageProducts.some((product) => !product)) {
      throw new Error('A API retornou um produto inválido na lista.');
    }
    products.push(...pageProducts);
  }

  return products;
}

export async function fetchProductById(productId) {
  const data = await apiFetch(`/produtos/${productId}`);
  return normalizeProduct(data);
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

export async function fetchCurrentUser(token) {
  const data = await apiFetch('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!data?.usuario || typeof data.usuario !== 'object') {
    throw new Error('A API retornou uma resposta inválida para a sessão.');
  }

  return data.usuario;
}

export async function createOrder(items, token) {
  const data = await apiFetch('/pedidos', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      itens: items.map(({ id, quantity }) => ({
        produtoId: id,
        quantidade: quantity,
      })),
    }),
  });

  if (!data?.pedido || !Number.isInteger(data.pedido.id) || !data.pedido.total) {
    throw new Error('A API retornou uma resposta inválida para o pedido.');
  }

  return data.pedido;
}

export async function fetchAdminProducts(token) {
  const data = await apiFetch('/produtos/admin', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!Array.isArray(data?.produtos)) {
    throw new Error('A API retornou uma resposta inválida para os produtos administrativos.');
  }
  return data.produtos.map(normalizeProduct);
}

export async function createAdminProduct(payload, token) {
  const data = await apiFetch('/produtos', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  return normalizeProduct(data);
}

export async function updateAdminProduct(productId, payload, token) {
  const data = await apiFetch(`/produtos/${productId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  return normalizeProduct(data);
}

export async function deactivateAdminProduct(productId, token) {
  await apiFetch(`/produtos/${productId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function fetchAdminOrders(token) {
  const data = await apiFetch('/pedidos', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!Array.isArray(data?.pedidos)) {
    throw new Error('A API retornou uma resposta inválida para os pedidos.');
  }
  return data.pedidos;
}

export async function updateAdminOrderStatus(orderId, status, token) {
  const data = await apiFetch(`/pedidos/${orderId}/status`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status }),
  });
  if (!data?.pedido || data.pedido.id !== orderId) {
    throw new Error('A API retornou uma resposta inválida para a atualização do pedido.');
  }
  return data.pedido;
}

export async function fetchAdminCustomers(token) {
  const data = await apiFetch('/usuarios', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!Array.isArray(data)) {
    throw new Error('A API retornou uma resposta inválida para os clientes.');
  }
  return data;
}
