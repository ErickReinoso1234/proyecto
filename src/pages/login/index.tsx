import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm: React.FC = () => {
  return (
    <div className="container mt-8">
      <div className="row">
        <div className="col-md-6">
          <img src="https://th.bing.com/th/id/OIG3.J7La_qQtQ0Yo2hcZYHob?pid=ImgGn" className="img-fluid mt-5 rounded" alt="dad" />
        </div>
        <div className="col-md-6 my-auto"> 
          <div className="login-form mt-5"> 
            <form>
              <h2 className="text-center text-white">Inicio de Sesión</h2>
              <div className="form-group">
                <label htmlFor="username" className="text-white">Usuario:</label>
                <input type="text" className="form-control" id="username" placeholder="Introduce tu usuario" />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="text-white">Contraseña:</label>
                <input type="password" className="form-control" id="password" placeholder="Introduce tu contraseña" />
              </div>
              <br />
              <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;