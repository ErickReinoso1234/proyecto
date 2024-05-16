import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaginaPrincipal: React.FC = () => {
  return (
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col-md-4">
          <img src="https://th.bing.com/th/id/OIG2.Ca4kbNPZdUP37sJLUw5t?w=270&h=270&c=6&r=0&o=5&pid=ImgGn" className="img-fluid logo" alt="Logo" />
        </div>
        <div className="col-md-4">
          <div className="text-right">
            <p className="text-white">Login</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="text-left">
            <p className="text-white">Registrarse</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 align-self-center">
          <div className="text-white"> 
            <h1 className="mb-4">¡Haz que tus Ahorros Trabajen para Ti!</h1>
            <hr className="mb-4" style={{ borderTop: '2px solid white', width: '100%' }} /> 
            <p className="mb-4">Descubre una nueva forma de ahorrar y hacer crecer tu dinero. Gestiona tus finanzas de manera inteligente y alcanza tus metas con facilidad. ¡Empieza a ahorrar con nosotros hoy mismo!</p>
          </div>
        </div>
        <div className="col-md-6">
          <img src="https://th.bing.com/th/id/OIG3.J7La_qQtQ0Yo2hcZYHob?pid=ImgGn" className="img-fluid mt-5 rounded" alt="dad" />
        </div>
      </div>
    </div>
  );
};

export default PaginaPrincipal;
