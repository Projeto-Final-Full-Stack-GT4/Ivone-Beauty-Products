import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Products from './components/Products.jsx';
import Home from './pages/Home.jsx';


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
            path="*"
            element={<Home />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;