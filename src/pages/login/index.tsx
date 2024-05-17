import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Proyecto' && password === '123456') {
      setError('')
      window.location.href = '/inicio';
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="container mt-8">
      <div className="row">
        <div className="col-md-6">
          <img src="https://th.bing.com/th/id/OIG1.g8yX7LJfWQ8ImcuRkNLg?w=270&h=270&c=6&r=0&o=5&pid=ImgGn" className="img-fluid mt-5 rounded" alt="dad" />
        </div>
        <div className="col-md-6 my-auto"> 
          <div className="login-form mt-5"> 
            <form onSubmit={handleSubmit}>
              <h2 className="text-center text-white">Inicio de Sesión</h2>
              <div className="form-group">
                <label htmlFor="username" className="text-white">Usuario:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="username" 
                  placeholder="Introduce tu usuario" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="text-white">Contraseña:</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="Introduce tu contraseña" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <br />
              <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
              {error && <div className="text-danger">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
