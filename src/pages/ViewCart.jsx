import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.js";
import { useAuth } from "../context/AuthContext.js";
import { createOrder } from "../services/api.js";
import "./ViewCart.css";

function formatPrice(price) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function ViewCart() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [completedOrder, setCompletedOrder] = useState(null);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function handleCheckout() {
    setError("");
    setIsSubmitting(true);

    try {
      const order = await createOrder(items, token);
      clearCart();
      setCompletedOrder(order);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Não foi possível registrar o pedido."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (completedOrder) {
    return (
      <section className="cart-page" aria-live="polite">
        <h1>Pedido registrado</h1>
        <div className="cart-empty">
          <p>Pedido #{completedOrder.id} registrado com status pendente.</p>
          <p>Total: {formatPrice(Number(completedOrder.total))}</p>
          <p>Pagamento e frete não estão incluídos nesta etapa.</p>
          <Link to="/products" className="cart-continue">
            Continuar comprando
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="cart-page">
        <h1>Meu carrinho</h1>
        <div className="cart-empty">
          <p>Seu carrinho está vazio.</p>
          <Link to="/products" className="cart-continue">
            Continuar comprando
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-heading">
        <h1>Meu carrinho</h1>
        <button type="button" className="cart-clear" onClick={clearCart}>
          Limpar carrinho
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>{item.size}</p>
                <strong>{formatPrice(item.price)}</strong>
                <div className="cart-item-actions">
                  <div className="cart-quantity" aria-label={`Quantidade de ${item.name}`}>
                    <button
                      type="button"
                      aria-label={`Diminuir quantidade de ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Aumentar quantidade de ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="cart-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
              <strong className="cart-item-subtotal">
                {formatPrice(item.price * item.quantity)}
              </strong>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Resumo do pedido</h2>
          <p>
            <span>Subtotal</span>
            <strong>{formatPrice(total)}</strong>
          </p>
          <p>
            <span>Frete</span>
            <span>Não calculado</span>
          </p>
          <p className="cart-total">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </p>
          <Link to="/products" className="cart-continue">
            Continuar comprando
          </Link>
          {user && token ? (
            <button
              type="button"
              className="cart-checkout"
              onClick={handleCheckout}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registrando pedido..." : "Registrar pedido"}
            </button>
          ) : (
            <Link to="/login" className="cart-checkout">
              Entre para registrar o pedido
            </Link>
          )}
          {error && (
            <p className="cart-checkout-error" role="alert">
              {error}
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}

export default ViewCart;
