import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, DashboardOutlined, HistoryOutlined, FilePdfOutlined, FundOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      style={{ width: 250, height: '100vh', paddingTop: '56px', display: isOpen ? 'block' : 'none' }}
    > 
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/inicio">Inicio</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<FundOutlined />}>
        <Link to="/ahorros">Ahorros</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<DashboardOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<HistoryOutlined />}>
        <Link to="/historial">Historial</Link>
      </Menu.Item>
      <SubMenu key="sub1" icon={<FilePdfOutlined />} title="PDF">
        <Menu.Item key="6"><Link to="/pdf1">PDF 1</Link></Menu.Item>
        <Menu.Item key="7"><Link to="/pdf2">PDF 2</Link></Menu.Item>
        <Menu.Item key="8"><Link to="/pdf3">PDF 3</Link></Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Sidebar;
