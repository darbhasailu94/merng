import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.js';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="huge" color="teal">
    <Menu.Item
      name={user.username}
      active={activeItem !== 'books'}
      as={Link}
      to="/"
      onClick={handleItemClick}
    />
    <Menu.Item
      name='books'
      active={activeItem === 'books'}
      as={Link}
      to="/books"
      onClick={handleItemClick}
    />
    <Menu.Menu position='right'>
      <Menu.Item
          name='logout'
          onClick={logout}
          as={Link}
          to="/"
      />
    </Menu.Menu>
  </Menu>

  ) : (
    <Menu pointing secondary size="huge" color="teal">
    <Menu.Item
      name='home'
      active={activeItem === 'home'}
      onClick={handleItemClick}
      as={Link}
      to="/"
    />
    <Menu.Menu position='right'>
      <Menu.Item
        name='register'
        active={activeItem === 'register'}
        onClick={handleItemClick}
        as={Link}
        to="/register"
      />
      <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
      />
    </Menu.Menu>
  </Menu>
  )

    return menuBar;
}
export default MenuBar;