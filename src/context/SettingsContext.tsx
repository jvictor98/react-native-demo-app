import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {useColorScheme} from 'react-native';

import {strings, type Language, type StringKey} from '@/i18n/strings';
import {darkTheme, lightTheme, type Theme} from '@/theme/colors';

const STORAGE_KEY = '@demo/settings';

type Settings = {
  darkMode: boolean | null; // null = follow the system
  notifications: boolean;
  language: Language;
};

type SettingsContextValue = Settings & {
  isLoading: boolean;
  theme: Theme;
  t: (key: StringKey) => string;
  update: (changes: Partial<Settings>) => void;
};

const defaults: Settings = {darkMode: null, notifications: true, language: 'en'};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({children}: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const [settings, setSettings] = useState<Settings>(defaults);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(raw => {
        if (raw) {
          setSettings({...defaults, ...JSON.parse(raw)});
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const update = useCallback((changes: Partial<Settings>) => {
    setSettings(current => {
      const next = {...current, ...changes};
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const value = useMemo<SettingsContextValue>(() => {
    const isDark = settings.darkMode ?? systemScheme === 'dark';
    return {
      ...settings,
      isLoading,
      theme: isDark ? darkTheme : lightTheme,
      t: key => strings[settings.language][key],
      update,
    };
  }, [settings, isLoading, systemScheme, update]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used inside SettingsProvider');
  }
  return context;
}
