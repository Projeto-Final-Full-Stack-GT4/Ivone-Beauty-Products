import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/Header.jsx';
import Products from './components/Products.jsx';
import Home from './pages/Home.jsx';

import UserLogin from './pages/UserLogin.jsx';
import UserRegister from './pages/UserRegister.jsx';
import UserProfile from './pages/UserProfile.jsx';

import { AuthProvider, useAuth } from './context/AuthContext.jsx';

function RotaProtegida({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="container mt-5">Carregando...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function RotasApp() {
  const { user, loading } = useAuth();

  return (
    <>
      <Header
        brand="Ivone Beauty Products"
        description="Beleza e cuidado para você"
      />

      <main className="container">
        <Routes>
          {/* Rota original preservada */}
          <Route
            path="*"
            element={<Home />}
          />

          {/* Rotas adicionadas para autenticação */}
          <Route
            path="/login"
            element={
              loading ? (
                <p>Carregando...</p>
              ) : user ? (
                <Navigate to="/perfil" replace />
              ) : (
                <UserLogin />
              )
            }
          />

          <Route
            path="/cadastro"
            element={
              loading ? (
                <p>Carregando...</p>
              ) : user ? (
                <Navigate to="/perfil" replace />
              ) : (
                <UserRegister />
              )
            }
          />

          <Route
            path="/perfil"
            element={
              <RotaProtegida>
                <UserProfile />
              </RotaProtegida>
            }
          />

          <Route
            path="/produtos"
            element={<Products />}
          />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RotasApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
