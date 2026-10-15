import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';

import {AuthProvider, useAuth} from '@/context/AuthContext';
import {SettingsProvider, useSettings} from '@/context/SettingsContext';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SettingsProvider>
  );
}

function RootNavigator() {
  const {user, isLoading: authLoading} = useAuth();
  const {theme, isLoading: settingsLoading} = useSettings();
  const isLoading = authLoading || settingsLoading;

  // Keep the splash screen until the stored session and settings are restored.
  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      <Stack screenOptions={{headerShown: false, contentStyle: {backgroundColor: theme.background}}}>
        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
        <Stack.Protected guard={!user}>
          <Stack.Screen name="sign-in" />
        </Stack.Protected>
      </Stack>
    </>
  );
}
