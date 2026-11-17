const categories = [
  { id: 1, nome: 'Skincare', slug: 'skincare', descricao: 'Cuidados para a pele', use_in_menu: true },
  { id: 2, nome: 'Maquiagem', slug: 'maquiagem', descricao: 'Realce sua beleza', use_in_menu: true },
  { id: 3, nome: 'Kits', slug: 'kits', descricao: 'Combinações especiais', use_in_menu: true },
];

const products = [
  {
    id: 1,
    nome: 'Sérum Facial Revitalizante',
    descricao: 'Sérum leve que hidrata e ilumina a pele.',
    tamanho: '30ml',
    preco: 89.9,
    tag: 'Mais Vendido',
    imagem: '/images/serum.png',
    estoque: 2,
    ativo: true,
    categoria: 'skincare',
    reviews: [{ id: 101, user: 'Mariana Silva', rating: 5, date: '2026-11-12', comment: 'Pele iluminada e hidratada.' }],
  },
  {
    id: 2,
    nome: 'Gel de Limpeza Facial',
    descricao: 'Remove impurezas sem ressecar.',
    tamanho: '120ml',
    preco: 49.9,
    tag: 'Vegano',
    imagem: '',
    estoque: 0,
    ativo: true,
    categoria: 'skincare',
  },
  {
    id: 3,
    nome: 'Pó Compacto Matte',
    descricao: 'Acabamento matte para a pele.',
    tamanho: '10g',
    preco: 69.9,
    tag: 'Lançamento',
    imagem: '/images/po.png',
    estoque: 5,
    ativo: false,
    categoria: 'maquiagem',
  },
];

const adminProduct = {
  id: 1,
  nome: products[0].nome,
  descricao: products[0].descricao,
  tamanho: products[0].tamanho,
  preco: products[0].preco,
  tag: products[0].tag,
  imagem: products[0].imagem,
  estoque: products[0].estoque,
  ativo: products[0].ativo,
  categoria: products[0].categoria,
};

const customer = {
  id: 12,
  nome: 'Cliente de Teste',
  email: 'cliente@exemplo.com',
  cpf: '12345678901',
  role: 'cliente',
};

function installApiStubs() {
  cy.intercept('GET', '**/api/v1/categorias*', { body: { categorias: categories, totalPaginas: 1 } });
  cy.intercept('GET', '**/api/v1/produtos*', (request) => {
    const url = new URL(request.url);

    if (url.pathname.endsWith('/produtos/admin')) {
      request.reply({ body: { produtos: [adminProduct] } });
      return;
    }

    const productId = url.pathname.match(/\/produtos\/(\d+)$/)?.[1];
    if (productId) {
      request.reply({ body: products.find((product) => product.id === Number(productId)) || null });
      return;
    }

    const search = url.searchParams.get('busca')?.toLowerCase();
    const categoryId = url.searchParams.get('categoriaId');
    let result = products;
    if (search) result = result.filter((product) => product.nome.toLowerCase().includes(search));
    if (categoryId === '1') result = result.filter((product) => product.categoria === 'skincare');
    if (categoryId === '2') result = result.filter((product) => product.categoria === 'maquiagem');
    if (url.searchParams.get('categoria') === 'skincare') {
      result = result.filter((product) => product.categoria === 'skincare');
    }

    request.reply({ body: { produtos: result, totalPaginas: 1 } });
  });
}

function visitAs(user = customer, token = 'token-e2e') {
  cy.visit('/admin', {
    onBeforeLoad(window) {
      window.localStorage.setItem('ivone-access-token', token);
      window.localStorage.setItem('ivone-user', JSON.stringify(user));
    },
  });
}

describe('Loja Ivone Beauty Product', () => {
  beforeEach(() => {
    installApiStubs();
  });

  it('navega pela home, pesquisa produtos e filtra por categoria', () => {
    cy.visit('/');
    cy.contains('h1', 'Sua beleza,').should('be.visible');
    cy.contains('PRODUTOS EM DESTAQUE').should('be.visible');
    cy.contains('Nossas Categorias').should('be.visible');
    cy.get('a[aria-label="Ver produtos de Skincare"]').click();
    cy.location('search').should('eq', '?categoriaId=1');
    cy.contains('h1', 'Skincare').should('be.visible');
    cy.contains('Sérum Facial Revitalizante').should('be.visible');
    cy.contains('Gel de Limpeza Facial').should('be.visible');
    cy.contains('Pó Compacto Matte').should('not.exist');

    cy.get('input[aria-label="Buscar produtos pelo nome"]').clear().type('pó compacto');
    cy.get('button[aria-label="Pesquisar produtos"]').click();
    cy.location('search').should('eq', '?busca=p%C3%B3%20compacto');
    cy.contains('Resultados para "pó compacto"').should('be.visible');
    cy.contains('Pó Compacto Matte').should('be.visible');
  });

  it('apresenta o produto, avaliações e mantém estoque e quantidades no carrinho', () => {
    cy.intercept('GET', '**/api/v1/produtos/1', { body: products[0] }).as('productDetails');
    cy.visit('/product/1');
    cy.wait('@productDetails');
    cy.contains('h1', 'Sérum Facial Revitalizante').should('be.visible');
    cy.contains('Avaliações de Clientes (1)').should('be.visible');
    cy.contains('12/11/2026').should('be.visible');
    cy.contains('Pele iluminada e hidratada.').should('be.visible');
    cy.contains('button', 'Adicionar ao carrinho').click();
    cy.get('a[aria-label="Carrinho, 1 itens"]').click();
    cy.contains('Meu carrinho').should('be.visible');
    cy.contains('89,90').should('be.visible');

    cy.get('button[aria-label="Aumentar quantidade de Sérum Facial Revitalizante"]').click();
    cy.contains('Estoque disponível: 2').should('be.visible');
    cy.get('button[aria-label="Aumentar quantidade de Sérum Facial Revitalizante"]').should('be.disabled');
    cy.get('button[aria-label="Diminuir quantidade de Sérum Facial Revitalizante"]').click();
    cy.contains('button', 'Remover').click();
    cy.contains('Seu carrinho está vazio.').should('be.visible');
  });

  it('gerencia a lista de desejos e trata uma rota inexistente', () => {
    cy.visit('/wishlist');
    cy.contains('Sua lista ainda está vazia.').should('be.visible');
    cy.contains('Explore nossos produtos').click();
    cy.contains('button', 'Sem estoque').should('be.disabled');
    cy.contains('Sérum Facial Revitalizante')
      .parents('.product-card')
      .find('button.product-wishlist')
      .click();
    cy.get('a[aria-label="Lista de desejos"]').click();
    cy.contains('Minha lista de desejos').should('be.visible');
    cy.contains('Sérum Facial Revitalizante').should('be.visible');
    cy.get('button[aria-label="Remover Sérum Facial Revitalizante da lista de desejos"]').click();
    cy.contains('Sua lista ainda está vazia.').should('be.visible');

    cy.visit('/rota-inexistente');
    cy.contains('Esta página estará disponível em breve.').should('be.visible');
  });

  it('valida o cadastro e permite entrar e sair da conta', () => {
    cy.clock();
    cy.intercept('POST', '**/api/v1/auth/register', {
      statusCode: 201,
      body: { usuario: customer },
    }).as('register');
    cy.visit('/registro');
    cy.get('[name="nome"]').type('  Cliente de Teste  ');
    cy.get('[name="email"]').type('CLIENTE@EXEMPLO.COM');
    cy.get('[name="cpf"]').type('123.456.789-01');
    cy.get('[name="senha"]').type('SenhaSegura1');
    cy.get('[name="confirmarSenha"]').type('SenhaDiferente1');
    cy.contains('button', 'Criar conta').click();
    cy.contains('As senhas devem ser iguais.').should('be.visible');
    cy.get('[name="confirmarSenha"]').clear().type('SenhaSegura1');
    cy.contains('button', 'Criar conta').click();
    cy.wait('@register').its('request.body').should('deep.equal', {
      nome: 'Cliente de Teste',
      email: 'cliente@exemplo.com',
      cpf: '12345678901',
      senha: 'SenhaSegura1',
    });
    cy.contains('Cadastro realizado com sucesso!').should('be.visible');
    cy.tick(900);
    cy.location('pathname').should('eq', '/login');

    cy.intercept('POST', '**/api/v1/auth/login', {
      body: { token: 'token-e2e', usuario: customer },
    }).as('login');
    cy.intercept('GET', '**/api/v1/auth/me', { body: { usuario: customer } });
    cy.get('#login-email').type('CLIENTE@EXEMPLO.COM');
    cy.get('#login-password').type('SenhaSegura1');
    cy.contains('button', 'Entrar').click();
    cy.wait('@login').its('request.body.email').should('eq', 'cliente@exemplo.com');
    cy.contains('h1', 'Dados pessoais').should('be.visible');
    cy.contains('Olá, Cliente de Teste').should('be.visible');
    cy.contains('button', 'Sair da conta').click();
    cy.location('pathname').should('eq', '/login');
    cy.get('#login-email').should('be.visible');
  });

  it('exibe erros de autenticação e invalida uma sessão expirada', () => {
    cy.intercept('POST', '**/api/v1/auth/login', {
      statusCode: 401,
      body: { erro: 'Credenciais inválidas.' },
    });
    cy.visit('/login');
    cy.get('#login-email').type('cliente@exemplo.com');
    cy.get('#login-password').type('senha-incorreta');
    cy.contains('button', 'Entrar').click();
    cy.contains('Credenciais inválidas.').should('be.visible');

    cy.intercept('GET', '**/api/v1/auth/me', {
      statusCode: 401,
      body: { erro: 'Sessão expirada.' },
    });
    cy.visit('/dados-pessoais', {
      onBeforeLoad(window) {
        window.localStorage.setItem('ivone-access-token', 'token-expirado');
        window.localStorage.setItem('ivone-user', JSON.stringify(customer));
      },
    });
    cy.location('pathname').should('eq', '/login');
    cy.window().its('localStorage').invoke('getItem', 'ivone-access-token').should('be.null');
  });

  it('registra um pedido, limpa o carrinho e apresenta a confirmação', () => {
    cy.intercept('GET', '**/api/v1/auth/me', { body: { usuario: customer } });
    cy.intercept('POST', '**/api/v1/pedidos', (request) => {
      expect(request.body).to.deep.equal({ itens: [{ produtoId: 1, quantidade: 1 }] });
      request.reply({ body: { pedido: { id: 345, total: '89.90' } } });
    }).as('createOrder');
    cy.visit('/cart', {
      onBeforeLoad(window) {
        window.localStorage.setItem('ivone-access-token', 'token-e2e');
        window.localStorage.setItem('ivone-user', JSON.stringify(customer));
        window.localStorage.setItem('ivone-cart', JSON.stringify([
          { ...products[0], name: products[0].nome, price: products[0].preco, quantity: 1 },
        ]));
      },
    });
    cy.contains('Registrar pedido').click();
    cy.wait('@createOrder');
    cy.contains('Pedido #345 registrado com status pendente.').should('be.visible');
    cy.get('a[aria-label="Carrinho, 0 itens"]').should('be.visible');
  });

  it('administra produtos, categorias, pedidos e clientes', () => {
    const createdProduct = { ...adminProduct, id: 4, nome: 'Produto Novo', name: 'Produto Novo', preco: 25, price: 25 };
    const createdCategory = { id: 4, nome: 'Cabelos', slug: 'cabelos', descricao: 'Cuidados capilares', use_in_menu: true };
    cy.intercept('GET', '**/api/v1/auth/me', { body: { usuario: { ...customer, role: 'admin' } } });
    cy.intercept('GET', '**/api/v1/pedidos', {
      body: { pedidos: [{
        id: 21,
        total: '89.90',
        status: 'pendente',
        createdAt: '2026-11-16T12:00:00.000Z',
        usuario: customer,
        itens: [{ id: 1, quantidade: 1, precoUnitario: '89.90', produto: { nome: products[0].nome } }],
      }] },
    });
    cy.intercept('GET', '**/api/v1/usuarios', { body: [customer] });
    cy.intercept('POST', '**/api/v1/produtos', { body: createdProduct }).as('createProduct');
    cy.intercept('PATCH', '**/api/v1/produtos/4', { body: { ...createdProduct, nome: 'Produto Atualizado', name: 'Produto Atualizado' } }).as('updateProduct');
    cy.intercept('GET', '**/api/v1/produtos/admin', { body: { produtos: [
      adminProduct,
      { ...adminProduct, id: 3, nome: 'Pó Compacto Matte', ativo: false, estoque: 5 },
    ] } });
    cy.intercept('DELETE', '**/api/v1/produtos/1', { statusCode: 200, body: {} }).as('deactivateProduct');
    cy.intercept('PATCH', '**/api/v1/produtos/3', { body: { ...adminProduct, id: 3, nome: 'Pó Compacto Matte', ativo: true } }).as('reactivateProduct');
    cy.intercept('POST', '**/api/v1/categorias', { body: createdCategory }).as('createCategory');
    cy.intercept('PATCH', '**/api/v1/categorias/4', (request) => {
      request.reply({ body: { ...createdCategory, ...request.body } });
    }).as('updateCategory');
    cy.intercept('DELETE', '**/api/v1/categorias/4', { statusCode: 200, body: {} }).as('deleteCategory');
    cy.intercept('PATCH', '**/api/v1/pedidos/21/status', { body: { pedido: { id: 21, status: 'pago' } } }).as('updateOrder');

    visitAs({ ...customer, role: 'admin' });
    cy.contains('Administração da loja').should('be.visible');
    cy.contains('Sérum Facial Revitalizante').should('be.visible');
    cy.get('[name="nome"]').first().type('Produto Novo');
    cy.get('[name="categoriaId"]').select('1');
    cy.get('[name="descricao"]').type('Descrição do produto');
    cy.get('[name="tamanho"]').type('50ml');
    cy.get('[name="preco"]').type('25');
    cy.get('[name="estoque"]').clear().type('3');
    cy.contains('button', 'Cadastrar produto').click();
    cy.wait('@createProduct');
    cy.contains('Produto cadastrado.').should('be.visible');
    cy.contains('tr', 'Produto Novo').contains('Editar').click();
    cy.get('[name="nome"]').clear().type('Produto Atualizado');
    cy.contains('button', 'Salvar alterações').click();
    cy.wait('@updateProduct');
    cy.contains('Produto atualizado.').should('be.visible');
    cy.contains('tr', 'Sérum Facial Revitalizante').contains('Desativar').click();
    cy.wait('@deactivateProduct');
    cy.contains('Produto desativado.').should('be.visible');
    cy.contains('tr', 'Pó Compacto Matte').contains('Reativar').click();
    cy.wait('@reactivateProduct');
    cy.contains('Produto reativado.').should('be.visible');

    cy.contains('button.admin-tab', 'Categorias').click();
    cy.get('[name="nome"]').first().type('Cabelos');
    cy.get('[name="descricao"]').type('Cuidados capilares');
    cy.contains('button', 'Cadastrar categoria').click();
    cy.wait('@createCategory');
    cy.contains('Categoria cadastrada.').should('be.visible');
    cy.contains('tr', 'Cabelos').contains('Editar').click();
    cy.get('[name="descricao"]').clear().type('Cuidados para todos os tipos de cabelo');
    cy.contains('button', 'Salvar alterações').click();
    cy.wait('@updateCategory');
    cy.contains('Categoria atualizada.').should('be.visible');
    cy.contains('tr', 'Cabelos').contains('Ocultar').click();
    cy.wait('@updateCategory');
    cy.contains('Categoria removida do menu.').should('be.visible');
    cy.contains('tr', 'Cabelos').contains('Excluir').click();
    cy.wait('@deleteCategory');
    cy.contains('Categoria excluída.').should('be.visible');

    cy.contains('button.admin-tab', 'Pedidos').click();
    cy.contains('Pedido #21').should('be.visible');
    cy.get('.admin-status-control select').select('pago');
    cy.wait('@updateOrder');
    cy.contains('Pedido #21 atualizado para pago.').should('be.visible');
    cy.contains('button.admin-tab', 'Clientes').click();
    cy.contains('cliente@exemplo.com').should('be.visible');
  });
});
