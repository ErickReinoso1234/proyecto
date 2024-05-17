import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, DashboardOutlined, HistoryOutlined, FilePdfOutlined, FundOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

interface SidebarProps {
  isOpen: boolean;
}

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  link?: string;
  to?: string;
  children?: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const items: MenuItem[] = [
    {
      key: '1', label: 'Inicio', icon: <HomeOutlined />, link: '/inicio',
    },
    {
      key: '2', label: 'Ahorros', icon: <FundOutlined />, link: '/ahorros',
    },
    {
      key: '3', label: 'Dashboard', icon: <DashboardOutlined />, link: '/dashboard',
    },
    {
      key: '4', label: 'Historial', icon: <HistoryOutlined />, link: '/historial',
    },
    {
      key: 'sub1',
      label: 'PDF',
      icon: <FilePdfOutlined />,
      children: [
        {
          key: '6', label: 'PDF 1', link: '/pdf1',
          icon: undefined,
        },
        {
          key: '7', label: 'PDF 2', link: '/pdf2',
          icon: undefined,
        },
        {
          key: '8', label: 'PDF 3', link: '/pdf3',
          icon: undefined,
        },
      ],
    },
  ];

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) =>
      item.children ? (
        <SubMenu key={item.key} icon={item.icon} title={item.label}>
          {renderMenuItems(item.children)}
        </SubMenu>
      ) : (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.link || ''}>{item.label}</Link>
        </Menu.Item>
      )
    );
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      style={{ width: 250, height: '100vh', paddingTop: '56px', display: isOpen ? 'block' : 'none' }}
    >
      {renderMenuItems(items)}
    </Menu>
  );
};

export default Sidebar;
