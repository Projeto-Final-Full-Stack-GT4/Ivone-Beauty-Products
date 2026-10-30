import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Product from './pages/Product.jsx';
import UserRegister from './pages/UserRegister.jsx';
import ViewCart from './pages/ViewCart.jsx';
import About from './pages/About.jsx';
import Wishlist from './pages/Wishlist.jsx';
import UserLogin from './pages/UserLogin.jsx';
import UserProfile from './pages/UserProfile.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import { CartProvider } from './context/CartProvider.jsx';
import { WishlistProvider } from './context/WishlistProvider.jsx';



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <Header />
          <main className="site-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<ViewCart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/dados-pessoais" element={<UserProfile />} />
              <Route path="/registro" element={<UserRegister />} />
              <Route path="/sobre" element={<About />} />
              <Route path="*" element={<p>Esta página estará disponível em breve.</p>} />
            </Routes>
          </main>
          <Footer />
        </WishlistProvider>
      </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;