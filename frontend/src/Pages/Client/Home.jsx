import Baner from '../../assets/Banner.png';
import React from 'react';
import './../style/Client/Home.css';
import { useHome } from '../../hooks/pages/useHome';

function Home() {
  const { mostrarModal, abrirModal, cerrarModal } = useHome();

  return (
    <div className="home">
      <img src={Baner} alt="Banner" className="home-banner" />
      
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={cerrarModal}>X</button>
            {/* Aquí puedes agregar el contenido del modal de login si lo deseas */}
            <h2>Vital Bytes</h2>
            <div className="modal-tabs">
              <span className="active-tab">Iniciar sesión</span>
            </div>
            <div className="modal-inputs">
              <input type="text" placeholder="Usuario" />
              <input type="password" placeholder="Contraseña" />
            </div>
            <button className="modal-login-button">Iniciar sesión</button>
          </div>
        </div>
      )}
      <section className="about-section">
        <h2>Acerca de Nosotros</h2>
        <p>
          En Vital Byte, creemos que una alimentación saludable es la clave para una vida equilibrada y llena de energía.
          Nos especializamos en la venta de productos naturales y nutritivos diseñados para potenciar tu bienestar y ayudarte a alcanzar tus objetivos físicos.
        </p>
        <p>
          Nuestro compromiso es ofrecerte alimentos de alta calidad, cuidadosamente pensados en tu salud y en la de la naturaleza.
          Nos apasiona promover hábitos alimenticios responsables que no solo te ayuden a ti, sino también al planeta.
        </p>
        <p>
          Más que una tienda, somos una comunidad apasionada por la nutrición y el bienestar. Te acompañamos en tu camino hacia una vida más saludable,
          proponiéndote productos prácticos y deliciosos hechos a partir de ingredientes reales.
          ¡Bienvenido a Vital Byte y nutre tu cuerpo con lo mejor de la naturaleza! 🌿✨
        </p>
      </section>
      <section className="cards-container">
        <div className="card">
          <h3>Términos y Condiciones</h3>
          <p>
           Al acceder y utilizar esta tienda en línea, aceptas que los productos ofrecidos son alimentos saludables sujetos a disponibilidad, y que toda la información brindada es veraz y actualizada. Nos reservamos el derecho de modificar precios, descripciones, y políticas sin previo aviso, así como de rechazar pedidos por razones justificadas como sospecha de fraude o falta de inventario.
          </p>
        </div>
        <div className="card">
          <h3>Política de Privacidad</h3>
          <p>
            Los pedidos realizados están sujetos a confirmación y se procesan con base en disponibilidad y tiempo estimado de entrega. No aceptamos devoluciones de productos alimenticios salvo en caso de daño comprobable. El uso del sitio implica la aceptación de nuestras políticas de privacidad, propiedad intelectual y responsabilidad por el consumo adecuado de nuestros productos, incluyendo alergias o restricciones personales.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
