import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import {
  createAdminCategory,
  createAdminProduct,
  deleteAdminCategory,
  deactivateAdminProduct,
  fetchAdminCustomers,
  fetchAdminCategories,
  fetchAdminOrders,
  fetchAdminProducts,
  updateAdminCategory,
  updateAdminOrderStatus,
  updateAdminProduct,
} from '../services/api.js';
import './AdminDashboard.css';

const EMPTY_PRODUCT = {
  nome: '',
  categoriaId: '',
  descricao: '',
  tamanho: '',
  preco: '',
  tag: '',
  imagem: '',
  estoque: '0',
};

const EMPTY_CATEGORY = {
  nome: '',
  descricao: '',
  use_in_menu: true,
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
  { id: 'categories', label: 'Categorias' },
  { id: 'orders', label: 'Pedidos' },
  { id: 'customers', label: 'Clientes' },
];

export default function AdminDashboard() {
  const { user, token, isLoading } = useAuth();
  const [section, setSection] = useState('products');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT);
  const [categoryForm, setCategoryForm] = useState(EMPTY_CATEGORY);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let active = true;

    async function loadSection() {
      try {
        if (section === 'products') {
          const [productResults, categoryResults] = await Promise.all([
            fetchAdminProducts(token),
            fetchAdminCategories(),
          ]);
          if (active) {
            setProducts(productResults);
            setCategories(categoryResults);
          }
        } else if (section === 'categories') {
          const result = await fetchAdminCategories();
          if (active) setCategories(result);
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
      categoriaId: String(
        product.categorias?.[0]?.id ??
        categories.find((category) => category.slug === product.categoria)?.id ??
        ''
      ),
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
      categoriaId: Number(productForm.categoriaId),
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

  function resetCategoryForm() {
    setEditingCategory(null);
    setCategoryForm(EMPTY_CATEGORY);
  }

  function editCategory(category) {
    setEditingCategory(category);
    setCategoryForm({
      nome: category.nome,
      descricao: category.descricao || '',
      use_in_menu: category.use_in_menu,
    });
    setError('');
    setSuccess('');
  }

  async function handleCategorySubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    const payload = {
      nome: categoryForm.nome.trim(),
      descricao: categoryForm.descricao.trim() || null,
      use_in_menu: categoryForm.use_in_menu,
    };

    try {
      const savedCategory = editingCategory
        ? await updateAdminCategory(editingCategory.id, payload, token)
        : await createAdminCategory(payload, token);

      setCategories((current) => (
        [...current.filter((category) => category.id !== savedCategory.id), savedCategory]
          .sort((a, b) => a.id - b.id)
      ));
      setSuccess(editingCategory ? 'Categoria atualizada.' : 'Categoria cadastrada.');
      resetCategoryForm();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Não foi possível salvar a categoria.');
    }
  }

  async function toggleCategoryMenu(category) {
    setError('');
    setSuccess('');

    try {
      const updatedCategory = await updateAdminCategory(
        category.id,
        { use_in_menu: !category.use_in_menu },
        token
      );
      setCategories((current) => current.map((item) => (
        item.id === updatedCategory.id ? updatedCategory : item
      )));
      setSuccess(
        updatedCategory.use_in_menu
          ? 'Categoria exibida no menu.'
          : 'Categoria removida do menu.'
      );
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Não foi possível atualizar a categoria.');
    }
  }

  async function removeCategory(category) {
    setError('');
    setSuccess('');

    try {
      await deleteAdminCategory(category.id, token);
      setCategories((current) => current.filter((item) => item.id !== category.id));
      setSuccess('Categoria excluída.');
      if (editingCategory?.id === category.id) resetCategoryForm();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Não foi possível excluir a categoria.');
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
                name="categoriaId"
                value={productForm.categoriaId}
                onChange={(event) => setProductForm({ ...productForm, categoriaId: event.target.value })}
                required
              >
                <option value="" disabled>Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.nome}</option>
                ))}
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

      {section === 'categories' && (
        <div className="admin-products">
          <form className="admin-panel admin-product-form" onSubmit={handleCategorySubmit}>
            <h2>{editingCategory ? 'Editar categoria' : 'Cadastrar categoria'}</h2>
            <label>
              Nome
              <input
                name="nome"
                value={categoryForm.nome}
                onChange={(event) => setCategoryForm({ ...categoryForm, nome: event.target.value })}
                required
              />
            </label>
            <label>
              Descrição
              <textarea
                name="descricao"
                value={categoryForm.descricao}
                onChange={(event) => setCategoryForm({ ...categoryForm, descricao: event.target.value })}
                rows="3"
              />
            </label>
            <label className="admin-checkbox-label">
              <input
                name="use_in_menu"
                type="checkbox"
                checked={categoryForm.use_in_menu}
                onChange={(event) => setCategoryForm({
                  ...categoryForm,
                  use_in_menu: event.target.checked,
                })}
              />
              Exibir no menu
            </label>
            <div className="admin-form-actions">
              <button type="submit" className="admin-primary-button">
                {editingCategory ? 'Salvar alterações' : 'Cadastrar categoria'}
              </button>
              {editingCategory && (
                <button type="button" className="admin-secondary-button" onClick={resetCategoryForm}>
                  Cancelar edição
                </button>
              )}
            </div>
          </form>

          <div className="admin-panel">
            <h2>Categorias</h2>
            {categories.length === 0 ? (
              <p>Nenhuma categoria cadastrada.</p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Slug</th>
                      <th>Menu</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td>{category.nome}</td>
                        <td>{category.slug}</td>
                        <td>{category.use_in_menu ? 'Visível' : 'Oculta'}</td>
                        <td className="admin-row-actions">
                          <button type="button" onClick={() => editCategory(category)}>Editar</button>
                          <button type="button" onClick={() => toggleCategoryMenu(category)}>
                            {category.use_in_menu ? 'Ocultar' : 'Exibir'}
                          </button>
                          <button type="button" onClick={() => removeCategory(category)}>Excluir</button>
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
