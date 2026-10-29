import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Product from './pages/Product.jsx';
import UserRegister from './pages/UserRegister.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import Wishlist from './pages/Wishlist.jsx';


function App() {
  return (
    <WishlistProvider>
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
          <Route path="/registro" element={<UserRegister />} />
          <Route path="/wishlist" element={<Wishlist />} />
          
          <Route path="*" element={<p>Esta página estará disponível em breve.</p>} />
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
    </WishlistProvider>

  );
}

export default App;