import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import Navbar from './pages/navbar';
import Sidebar from './pages/sidebar';

const App: React.FC = () => {
  const [abrirSidebar, setAbrirSidebar] = useState(false);
  const [cerrarSesion, setCerrarSesion] = useState(false);

  const controlSidebar = () => {
    setAbrirSidebar(!abrirSidebar);
  };

  const handleCerrarSesion = () => {
    // Aquí puedes agregar la lógica para cerrar sesión
    // Por ejemplo, limpiar el token de autenticación, eliminar la sesión, etc.
    // Luego establece el estado de cerrarSesion como true
    setCerrarSesion(true);
    // Opcionalmente, podrías redirigir al usuario a la página de inicio
    window.location.href = "/";
  };

  // Si el usuario ha cerrado la sesión, no muestra ni el Navbar ni el Sidebar
  if (cerrarSesion) {
    return null;
  }

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar barraLateral={controlSidebar} handleCerrarSesion={handleCerrarSesion} />
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar isOpen={abrirSidebar} />
          <div style={{ flex: 1, padding: '20px' }}>
            <AppRouter abrirSidebar={false} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;