import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import Sidebar from './sidebar';   
 
interface NavbarProps {
    onToggleSidebar: () => void;
  }

const { Search } = Input;

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) =>{
  const [isSidebarOpen,] = useState(false);


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#141a41' }}>
        <div className="container">
          <button className="navbar-toggler-left" type="button" onClick={onToggleSidebar}  style={{ backgroundColor: '#141a41', border: 'none' }}>
            <MenuOutlined style={{ color: 'white' }} /> <span style={{ color: 'white', marginLeft: '5px' }}>Menu</span>
          </button>
          <ul className="navbar-nav ml-auto d-flex ">
          <Search placeholder="Buscar..." enterButton={<SearchOutlined />} style={{ width: '250px', marginRight: '10px' }} />
            <li className="nav-item">
              <Button type="link" icon={<UserOutlined />} style={{ color: 'white' }}> <span style={{ color: 'white' }}>Perfil Usuario</span></Button>
            </li>
          </ul>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} />
    </>
  );
};

export default Navbar;
