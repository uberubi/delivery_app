import React, { useState, useContext, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);

  
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu color="red" size="massive" pointing secondary>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      >
        Home
      </Menu.Item>

      <Menu.Item
        name="products"
        active={activeItem === "products"}
        onClick={handleItemClick}
        as={Link}
        to="/products"
      >
        Products
      </Menu.Item>

      <Menu.Item
        name="address"
        active={activeItem === "address"}
        onClick={handleItemClick}
        as={Link}
        to="/address"
      >
        Address
      </Menu.Item>

      <Menu.Item
        name="orders"
        active={activeItem === "orders"}
        onClick={handleItemClick}
        as={Link}
        to="/orders"
      >
        Orders
      </Menu.Item>
      {user ? (
        <Menu.Menu position="right">
          <Menu.Item name={user.username} onClick={logout} as={Link} to="/">
            Logout
          </Menu.Item>
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          >
            Login
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
};

export default MenuBar;
