import { createContext, useContext, useState } from 'react';
import { router } from 'expo-router';
import { userService } from '../services/userService';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      // In a real app, validate password here
      const user = await userService.getUserByEmail(email);
      setUser(user);
      router.replace('/(app)/(tabs)');
    } catch (error) {
      console.error(error);
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    router.replace('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);