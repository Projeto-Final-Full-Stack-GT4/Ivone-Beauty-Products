import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import {
  createAdminProduct,
  deactivateAdminProduct,
  fetchAdminCustomers,
  fetchAdminOrders,
  fetchAdminProducts,
  updateAdminOrderStatus,
  updateAdminProduct,
} from '../services/api.js';
import './AdminDashboard.css';

const EMPTY_PRODUCT = {
  nome: '',
  categoria: 'skincare',
  descricao: '',
  tamanho: '',
  preco: '',
  tag: '',
  imagem: '',
  estoque: '0',
};

const NEXT_ORDER_STATUSES = {
  pendente: ['pago', 'cancelado'],
  pago: ['enviado', 'cancelado'],
  enviado: ['entregue'],
  entregue: [],
  cancelado: [],
};

const SECTIONS = [
  { id: 'products', label: 'Produtos e estoque' },
  { id: 'orders', label: 'Pedidos' },
  { id: 'customers', label: 'Clientes' },
];

export default function AdminDashboard() {
  const { user, token, isLoading } = useAuth();
  const [section, setSection] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let active = true;

    async function loadSection() {
      try {
        if (section === 'products') {
          const result = await fetchAdminProducts(token);
          if (active) setProducts(result);
        } else if (section === 'orders') {
          const result = await fetchAdminOrders(token);
          if (active) setOrders(result);
        } else {
          const result = await fetchAdminCustomers(token);
          if (active) setCustomers(result);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Não foi possível carregar os dados.');
        }
      }
    }

    if (!isLoading && token && user?.role === 'admin') {
      loadSection();
    }

    return () => {
      active = false;
    };
  }, [isLoading, section, token, user?.role]);

  if (isLoading) {
    return (
      <section className="admin-page">
        <h1>Validando sua sessão...</h1>
      </section>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;

  function changeSection(nextSection) {
    setSection(nextSection);
    setError('');
    setSuccess('');
  }

  function editProduct(product) {
    setEditingProduct(product);
    setProductForm({
      nome: product.nome,
      categoria: product.categoria,
      descricao: product.descricao,
      tamanho: product.tamanho,
      preco: String(product.preco),
      tag: product.tag || '',
      imagem: product.imagem || '',
      estoque: String(product.estoque),
    });
    setError('');
    setSuccess('');
  }

  function resetProductForm() {
    setEditingProduct(null);
    setProductForm(EMPTY_PRODUCT);
  }

  async function handleProductSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    const payload = {
      nome: productForm.nome.trim(),
      categoria: productForm.categoria,
      descricao: productForm.descricao.trim(),
      tamanho: productForm.tamanho.trim(),
      preco: Number(productForm.preco),
      tag: productForm.tag.trim() || null,
      imagem: productForm.imagem.trim() || null,
      estoque: Number(productForm.estoque),
    };

    try {
      const savedProduct = editingProduct
        ? await updateAdminProduct(editingProduct.id, payload, token)
        : await createAdminProduct(payload, token);

      setProducts((current) => (
        editingProduct
          ? current.map((product) => product.id === savedProduct.id ? savedProduct : product)
          : [...current, savedProduct].sort((a, b) => a.id - b.id)
      ));
      setSuccess(editingProduct ? 'Produto atualizado.' : 'Produto cadastrado.');
      resetProductForm();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Não foi possível salvar o produto.');
    }
  }

  async function toggleProductStatus(product) {
    setError('');
    setSuccess('');

    try {
      if (product.ativo) {
        await deactivateAdminProduct(product.id, token);
        setProducts((current) => current.map((item) => (
          item.id === product.id ? { ...item, ativo: false } : item
        )));
        setSuccess('Produto desativado.');
      } else {
        const updatedProduct = await updateAdminProduct(product.id, { ativo: true }, token);
        setProducts((current) => current.map((item) => (
          item.id === product.id ? updatedProduct : item
        )));
        setSuccess('Produto reativado.');
      }
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : 'Não foi possível alterar o produto.');
    }
  }

  async function changeOrderStatus(orderId, status) {
    setError('');
    setSuccess('');

    try {
      const updatedOrder = await updateAdminOrderStatus(orderId, status, token);
      setOrders((current) => current.map((order) => (
        order.id === updatedOrder.id ? { ...order, status: updatedOrder.status } : order
      )));
      setSuccess(`Pedido #${orderId} atualizado para ${updatedOrder.status}.`);
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : 'Não foi possível atualizar o pedido.');
    }
  }

  return (
    <section className="admin-page">
      <header className="admin-heading">
        <p>Área administrativa</p>
        <h1>Administração da loja</h1>
      </header>

      <nav className="admin-tabs" aria-label="Seções administrativas">
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={section === id ? 'admin-tab admin-tab--active' : 'admin-tab'}
            aria-pressed={section === id}
            onClick={() => changeSection(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {error && <p className="admin-feedback admin-feedback--error" role="alert">{error}</p>}
      {success && <p className="admin-feedback" role="status">{success}</p>}

      {section === 'products' && (
        <div className="admin-products">
          <form className="admin-panel admin-product-form" onSubmit={handleProductSubmit}>
            <h2>{editingProduct ? 'Editar produto' : 'Cadastrar produto'}</h2>
            <label>
              Nome
              <input
                name="nome"
                value={productForm.nome}
                onChange={(event) => setProductForm({ ...productForm, nome: event.target.value })}
                required
              />
            </label>
            <label>
              Categoria
              <select
                name="categoria"
                value={productForm.categoria}
                onChange={(event) => setProductForm({ ...productForm, categoria: event.target.value })}
              >
                <option value="skincare">Skincare</option>
                <option value="maquiagem">Maquiagem</option>
                <option value="cabelos">Cabelos</option>
                <option value="kits">Kits</option>
              </select>
            </label>
            <label>
              Descrição
              <textarea
                name="descricao"
                value={productForm.descricao}
                onChange={(event) => setProductForm({ ...productForm, descricao: event.target.value })}
                required
                rows="3"
              />
            </label>
            <div className="admin-form-row">
              <label>
                Tamanho
                <input
                  name="tamanho"
                  value={productForm.tamanho}
                  onChange={(event) => setProductForm({ ...productForm, tamanho: event.target.value })}
                  required
                />
              </label>
              <label>
                Preço (R$)
                <input
                  name="preco"
                  type="number"
                  min="0"
                  step="0.01"
                  value={productForm.preco}
                  onChange={(event) => setProductForm({ ...productForm, preco: event.target.value })}
                  required
                />
              </label>
            </div>
            <div className="admin-form-row">
              <label>
                Estoque
                <input
                  name="estoque"
                  type="number"
                  min="0"
                  step="1"
                  value={productForm.estoque}
                  onChange={(event) => setProductForm({ ...productForm, estoque: event.target.value })}
                  required
                />
              </label>
              <label>
                Etiqueta
                <input
                  name="tag"
                  value={productForm.tag}
                  onChange={(event) => setProductForm({ ...productForm, tag: event.target.value })}
                />
              </label>
            </div>
            <label>
              Caminho ou URL da imagem
              <input
                name="imagem"
                value={productForm.imagem}
                onChange={(event) => setProductForm({ ...productForm, imagem: event.target.value })}
                placeholder="product-images/produto.png"
              />
            </label>
            <div className="admin-form-actions">
              <button type="submit" className="admin-primary-button">
                {editingProduct ? 'Salvar alterações' : 'Cadastrar produto'}
              </button>
              {editingProduct && (
                <button type="button" className="admin-secondary-button" onClick={resetProductForm}>
                  Cancelar edição
                </button>
              )}
            </div>
          </form>

          <div className="admin-panel">
            <h2>Produtos e estoque</h2>
            {products.length === 0 ? (
              <p>Nenhum produto cadastrado.</p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Preço</th>
                      <th>Estoque</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        <td>{product.estoque}</td>
                        <td>{product.ativo ? 'Ativo' : 'Inativo'}</td>
                        <td className="admin-row-actions">
                          <button type="button" onClick={() => editProduct(product)}>Editar</button>
                          <button type="button" onClick={() => toggleProductStatus(product)}>
                            {product.ativo ? 'Desativar' : 'Reativar'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {section === 'orders' && (
        <div className="admin-panel">
          <h2>Pedidos</h2>
          {orders.length === 0 ? (
            <p>Nenhum pedido registrado.</p>
          ) : (
            <div className="admin-order-list">
              {orders.map((order) => (
                <article className="admin-order" key={order.id}>
                  <div className="admin-order-heading">
                    <div>
                      <h3>Pedido #{order.id}</h3>
                      <p>{order.usuario?.nome} · {order.usuario?.email}</p>
                    </div>
                    <strong>{Number(order.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                  </div>
                  <p className="admin-order-meta">
                    {new Date(order.createdAt).toLocaleString('pt-BR')} · Status: {order.status}
                  </p>
                  <ul>
                    {(order.itens || []).map((item) => (
                      <li key={item.id}>
                        {item.quantidade} × {item.produto?.nome || `Produto #${item.produtoId}`}
                        {' — '}
                        {Number(item.precoUnitario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </li>
                    ))}
                  </ul>
                  {NEXT_ORDER_STATUSES[order.status]?.length > 0 && (
                    <label className="admin-status-control">
                      Atualizar status
                      <select
                        key={`${order.id}-${order.status}`}
                        defaultValue=""
                        onChange={(event) => {
                          if (event.target.value) changeOrderStatus(order.id, event.target.value);
                        }}
                      >
                        <option value="" disabled>Selecione</option>
                        {NEXT_ORDER_STATUSES[order.status].map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </label>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      {section === 'customers' && (
        <div className="admin-panel">
          <h2>Clientes</h2>
          <p>Dados limitados a identificação e contato para atendimento.</p>
          {customers.length === 0 ? (
            <p>Nenhum cliente cadastrado.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Perfil</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.nome}</td>
                      <td>{customer.email}</td>
                      <td>{customer.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
