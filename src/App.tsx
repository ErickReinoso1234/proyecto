import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import Navbar from './pages/navbar';
import Sidebar from './pages/sidebar';

const App: React.FC = () => {
  const [abrirSidebar, setabrirSidebar] = useState(false);

  const controlSidebar = () => {
    setabrirSidebar(!abrirSidebar);
  };

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar barraLateral={controlSidebar} />
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
