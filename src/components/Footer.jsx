
function footer(){
    return (
         <footer className="footer">
            <div className="footer-top">

            <div className="brand">
               <div className=  "brand-name">
                  <span>Ivone</span>
                  <small>BEATY PRODUCT</small>
               </div>
            </div>
            <div className= "newsletter">
               <p>
                  Receba novidades,
                  promoçoes exclusivas e
                  dicas de beleza.
               </p>

               <form className="newsletter-form">
                 <input 
                 type="email" 
                  placeholder="Seu e-mail" 
                  aria-label="Seu e-mail"
                  required
                 />

         <button type="submit">
         QUERO RECEBER
      </button>
            </form>
            </div>

         <div className="social-links">
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="Facebook">Facebook</a>
          <a href="#" aria-label="TikTok">TikTok</a>
          <a href="#" aria-label="YouTube">YouTube</a>
        </div>

        </div>

      <div className="footer-bottom">
         <nav className="footer-links">
          <a href="#">Ajuda</a>
          <a href="#">Trocas e Devoluções</a>
          <a href="#">Política de Privacidade</a>
          <a href="#">Termos de Uso</a>
        </nav>

         <p className="copyright">
          Ivone Beauty Product © 2026.
          Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
export default Footer;

           
 