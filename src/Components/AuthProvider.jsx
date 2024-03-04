import React, {
  useState, useMemo, useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext.jsx';
import routes from '../routes.js';

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const getUser = JSON.parse(localStorage.getItem('userInfo'));
  const [token, setToken] = useState(getUser ?? null);

  const logIn = useCallback((response) => {
    const data = JSON.stringify(response.data);
    localStorage.setItem('userInfo', data);
    setToken(data);
    navigate(routes.accountPage());
  }, [navigate]);

  const logOut = useCallback(() => {
    localStorage.removeItem('userInfo');
    navigate(routes.loginPage());
  }, [navigate]);

  const context = useMemo(() => ({
    token,
    setToken,
    logOut,
    logIn,
  }), [token, setToken, logOut, logIn]);

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
