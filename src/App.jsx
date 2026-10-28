import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Product from './pages/Product.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header
        brand="Ivone Beauty Products"
        description="Beleza e cuidado para você"
      />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products/>} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="*" element={<p>Esta página estará disponível em breve.</p>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;