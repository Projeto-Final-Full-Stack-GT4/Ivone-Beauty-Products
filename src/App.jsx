import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header
        brand="Ivone Beauty Products"
        description="Beleza e cuidado para você"
      />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Ivone Beauty Products</h1>
                <p>Explore nossos produtos de beleza e cuidado.</p>
              </>
            }
          />
          <Route
            path="*"
            element={<p>Esta página estará disponível em breve.</p>}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;