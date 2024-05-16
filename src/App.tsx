import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import Navbar from './pages/navbar';
import Sidebar from './pages/sidebar';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar onToggleSidebar={handleSidebarToggle} />
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar isOpen={isSidebarOpen} />
          <div style={{ flex: 1, padding: '20px' }}>
            <AppRouter isSidebarOpen={false} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
