import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

export const useAuth = () => useContext(AuthContext);

export const getAccessToken = () => localStorage.getItem('accessToken');
