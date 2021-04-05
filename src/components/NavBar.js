import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Button } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';

const buildNav = navs => {
  return navs.map(page => {
    const [label, routeOrSub] = page;
    if (typeof(routeOrSub) === 'string') {
      return (
        <Menu.Item key={routeOrSub}>
          <Link to={routeOrSub}>{label}</Link>
        </Menu.Item>
      );
    } else if (Array.isArray(routeOrSub)) {
      return (
        <Menu.SubMenu key={label} title={label}>
          {buildNav(routeOrSub)}
        </Menu.SubMenu>
      );
    } else {
      throw new TypeError(
        'Invalid navigation object type. It should be a STRING indicating a route or an ARRAY with nested routes'
      );
    }
  })
}

const NavBar = props => {
  return (
    <Dropdown overlay={
      <Menu
        selectedKeys={[props.path]}
      >{buildNav(props.navs)}</Menu>
    }>
      <Button type="primary"><MenuFoldOutlined />Навигация</Button>
    </Dropdown>
  );
};

export default NavBar;
