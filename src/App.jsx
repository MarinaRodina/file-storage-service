import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import PersonalAccountPage from './Components/PersonalAccountPage.jsx';
import HeaderComponent from './Components/HeaderComponent.jsx';
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
      <HeaderComponent />
      <Routes>
        <Route
          path={routes.accountPage()}
          element={<RoutePrivate><PersonalAccountPage /></RoutePrivate>}
        />
        <Route path={routes.loginPage()} element={<LoginPage />} />
        <Route path={routes.registrationPage()} element={<RegistrationPage />} />
      </Routes>
    </div>
  </Provider>
);

export default App;
