import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #000000;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  color: #1DB954;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled(Link)`
  color: #ffffff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  transition: all 0.3s ease;

  &:hover, &.active {
    color: #1DB954;
  }
`;

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    if (path !== '/dashboard' && location.pathname.includes(path)) {
      return true;
    }
    return false;
  };

  return (
    <NavbarContainer>
      <NavContent>
        <Logo to="/dashboard">
          Spotify Stats
        </Logo>
        <NavMenu>
          <NavItem 
            to="/dashboard" 
            className={isActive('/dashboard') ? 'active' : ''}
          >
            Dashboard
          </NavItem>
          <NavItem 
            to="/top-artists" 
            className={isActive('/top-artists') ? 'active' : ''}
          >
            Top Artists
          </NavItem>
          <NavItem 
            to="/top-tracks" 
            className={isActive('/top-tracks') ? 'active' : ''}
          >
            Top Tracks
          </NavItem>
        </NavMenu>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar; 