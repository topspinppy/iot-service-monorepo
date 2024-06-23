import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Auth context must be use inside AuthProvider');
  return context;
};

export default useAuth;
