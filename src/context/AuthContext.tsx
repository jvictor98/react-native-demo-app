import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import type {PropsWithChildren} from 'react';

import {signInRequest, type User} from '@/data/api';

const STORAGE_KEY = '@demo/session-v2';

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({children}: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore the previous session so the user stays logged in between launches.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(raw => raw && setUser(JSON.parse(raw)))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const loggedUser = await signInRequest(email, password);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
    setUser(loggedUser);
  }, []);

  const signOut = useCallback(() => {
    AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
    setUser(null);
  }, []);

  const value = useMemo(() => ({user, isLoading, signIn, signOut}), [user, isLoading, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
