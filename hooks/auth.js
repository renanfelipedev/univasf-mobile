import { createContext, useContext, useCallback, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const [token, user] = await AsyncStorage.multiGet([
        '@Univasf-Mobile:token',
        '@Univasf-Mobile:user'
      ]);


      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
        api.defaults.headers.common.Authorization = `Bearer ${token[1]}`;
      }

      setLoading(false);
    }

    loadStorageData();
  }, [])

  const logIn = useCallback(async ({ login, senha }) => {
    setLoading(true);
    const { data } = await api.post('/login', { login });

    const { token, user } = data;

    await AsyncStorage.multiSet([
      ['@Univasf-Mobile:token', token],
      ['@Univasf-Mobile:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
    setLoading(false);
  }, []);

  const logOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Univasf-Mobile:token', '@Univasf-Mobile:user']);

    setData({});
  }, []);

  const isAuthenticated = !!data?.user && !!data?.token;

  return (
    <AuthContext.Provider value={{ user: data?.user, token: data?.token, loading, logIn, logOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used with an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
