import Hero from "../components/Hero";
import Beneficios from "../components/Beneficios";
import Products from "../components/Products";
import Categories from '../components/Categories.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <Beneficios />
      <Categories />
      <Products />
    </>
  );
}