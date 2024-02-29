import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import PersonalAccountPage from './Components/PersonalAccountPage.jsx';
import LoginPage from './Components/LoginPage.jsx';
import RegistrationPage from './Components/RegistrationPage.jsx';
import routes from './routes.js';
import useAuth from './Hooks/useAuth.jsx';
import store from './Slices/index.js';

const RoutePrivate = ({ children }) => {
  const auth = useAuth();
  return auth.logIn ? children : auth.logOut;
};

const App = () => (
  <Provider store={store}>
    <div className="d-flex flex-column h-100">
      <Routes>
        <Route
          path={routes.mediaGetPath()}
          element={<RoutePrivate><PersonalAccountPage /></RoutePrivate>}
        />
        <Route path={routes.loginPath()} element={<LoginPage />} />
        <Route path={routes.registerPath()} element={<RegistrationPage />} />
      </Routes>
    </div>
  </Provider>
);

export default App;
