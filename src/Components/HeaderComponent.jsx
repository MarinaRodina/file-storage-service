import React, { useState } from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth.jsx';
import routes from '../routes.js';
import axios from 'axios';

const getToken = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo).token : null;
};

const HeaderComponent = () => {
  const auth = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const token = getToken();
      await axios.post(routes.logoutPath(), null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      auth.logOut();
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <Navbar.Brand as={Link} to={routes.accountPage()}>{'File storage service'}</Navbar.Brand>
          {auth.token ? (
            <Button
              type="button"
              className="btn btn-primary"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {loggingOut ? 'Выход...' : 'Выйти'}
            </Button>
          ) : null}
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default HeaderComponent;
