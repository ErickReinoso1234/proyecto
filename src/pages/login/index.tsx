import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../states/usuarioState';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!username || !password) {
    setError('El nombre de usuario y contraseña son obligatorios para ingresar');
    return;
  }
  try {
    const response = await fetch('http://localhost:4000/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      setError('Inicio de sesión fallido. Usuario o contraseña incorrectos.');
      return; // Asegúrate de no navegar si el inicio de sesión falló
    }
    const data = await response.json();
    setUser(data);
    navigate('/inicio', { state: { usuario: data } });
  } catch (error) {
    setError('Error al procesar la solicitud de inicio de sesión.');
  }
};

  return (
    <div className="container mt-8">
      <div className="row">
        <div className="col-md-6">
          <img src="https://th.bing.com/th/id/OIG3.a2ieBkgUqi7HJAAwybae?w=1024&h=1024&rs=1&pid=ImgDetMain" className="img-fluid mt-5 rounded" alt="dad" />
        </div>
        <div className="col-md-6 my-auto">
          <div className="login-form mt-5">
            <form onSubmit={handleLogin}>
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
