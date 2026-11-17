# React + Vite

## Demonstração local integrada

Requisitos: Node.js e MySQL.

1. Inicie o MySQL e configure `Ivone-API/.env` a partir de `Ivone-API/.env.example`.
2. Na pasta `Ivone-API`, execute `npm install`, `npx sequelize-cli db:create`, `npm run db:migrate` e `npm run dev`.
3. Na pasta `Ivone-Beauty-Products`, copie `.env.example` para `.env.local`, execute `npm install` e `npm run dev`.
4. Abra o endereço informado pelo Vite (por padrão `http://localhost:5173`). A API deve estar em `http://localhost:3000`.

O exemplo configura o frontend para consumir a API local. Esta configuração é voltada à demonstração em sala; não contém credenciais válidas de produção.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Administração da loja

Usuários com perfil `admin` acessam o painel em `/admin` para gerenciar produtos, categorias e estoque, avançar status de pedidos e consultar dados mínimos de contato dos clientes. Produtos usam categorias carregadas da API; novas categorias com produtos associados não podem ser excluídas. A API valida o perfil em cada operação administrativa; o painel frontend não substitui essa proteção.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
