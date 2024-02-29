import { useContext } from 'react';
import AuthContext from '../Contexts/AuthContext.jsx';

const useAuth = () => useContext(AuthContext);

export default useAuth;
