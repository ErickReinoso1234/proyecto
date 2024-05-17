import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, UserOutlined, MenuOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './sidebar';   
 
interface NavbarProps {
  barraLateral: () => void;
  handleCerrarSesion: () => void;
}

const { Search } = Input;

const Navbar: React.FC<NavbarProps> = ({ barraLateral, handleCerrarSesion }) => {
  const location = useLocation();
  const [abrirSidebar] = useState(false);

  // Verifica si la ruta actual es "/"
  const hideNavbar = ["/login", "/register", "/"].includes(location.pathname);;

  // Si la ruta es "/", no mostrar el Navbar
  if (hideNavbar) {
    return null;
  }

  return (
    <><nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#141a41' }}>
      <div className="container">
        <button className="navbar-toggler-left" type="button" onClick={barraLateral} style={{ backgroundColor: '#141a41', border: 'none' }}>
          <MenuOutlined style={{ color: 'white' }} /> <span style={{ color: 'white', marginLeft: '5px' }}>Menu</span>
        </button>
        <ul className="navbar-nav ml-auto d-flex ">
          <Search placeholder="Buscar..." enterButton={<SearchOutlined />} style={{ width: '250px', marginRight: '10px' }} />
          <li className="nav-item">
            <Link to="/perfil">
              <Button type="link" icon={<UserOutlined />} style={{ color: 'white' }}> <span style={{ color: 'white' }}>Perfil Usuario</span></Button>
            </Link>
          </li>
          <li className="nav-item">
            <Button type="link" onClick={handleCerrarSesion} style={{ color: 'white' }}> <LogoutOutlined /> <span style={{ color: 'white' }}>Cerrar Sesión</span></Button>
          </li>
        </ul>
      </div>
    </nav><Sidebar isOpen={abrirSidebar} /></>
  );
};

export default Navbar;
