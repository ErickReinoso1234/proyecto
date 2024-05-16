import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import Sidebar from './sidebar';   
import { Link } from 'react-router-dom';
 
interface NavbarProps {
    barraLateral: () => void;
  }

const { Search } = Input;

const Navbar: React.FC<NavbarProps> = ({ barraLateral: onBarraLateral }) =>{
  const [abrirSidebar] = useState(false);


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#141a41' }}>
        <div className="container">
          <button className="navbar-toggler-left" type="button" onClick={onBarraLateral}  style={{ backgroundColor: '#141a41', border: 'none' }}>
            <MenuOutlined style={{ color: 'white' }} /> <span style={{ color: 'white', marginLeft: '5px' }}>Menu</span>
          </button>
          <ul className="navbar-nav ml-auto d-flex ">
          <Search placeholder="Buscar..." enterButton={<SearchOutlined />} style={{ width: '250px', marginRight: '10px' }} />
            <li className="nav-item">
            <Link to="/perfil">
                <Button type="link" icon={<UserOutlined />} style={{ color: 'white' }}> <span style={{ color: 'white' }}>Perfil Usuario</span></Button>
            </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Sidebar isOpen={abrirSidebar} />
    </>
  );
};

export default Navbar;