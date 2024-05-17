import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const location = useLocation();

  // Verifica si la ruta actual es "/"
  const showFooter = location.pathname === "/inicio";

  // Si la ruta no es "/", no mostrar el Footer
  if (!showFooter) {
    return null;
  }

  return (
    <footer className="footer mt-auto py-4 bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h6 className="mb-4">Sobre Nosotros</h6>
            <p>Somos una plataforma dedicada a la gestión y categorización de gastos diarios para ayudarte a mantener un control financiero efectivo.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h6 className="mb-4">Servicios</h6>
            <ul className="list-unstyled">
            <li><button className="text-white" onClick={() => { /* acción */ }}>Gestión de gastos</button></li>
            <li><button className="text-white" onClick={() => { /* acción */ }}>Categorización de gastos</button></li>
            <li><button className="text-white" onClick={() => { /* acción */ }}>Análisis financiero</button></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h6 className="mb-4">Contacto</h6>
            <p><FontAwesomeIcon icon={faEnvelope} /> ahorrospage@gmail.com</p>
            <p><FontAwesomeIcon icon={faPhone} /> +5939658741</p>
            <ul className="list-inline mt-3">
              <li className="list-inline-item"><FontAwesomeIcon icon={faFacebookF} size="lg" /></li>
              <li className="list-inline-item"><FontAwesomeIcon icon={faTwitter} size="lg" /></li>
              <li className="list-inline-item"><FontAwesomeIcon icon={faInstagram} size="lg" /></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
