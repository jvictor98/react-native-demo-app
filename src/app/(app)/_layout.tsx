import Ionicons from '@expo/vector-icons/Ionicons';
import {Tabs} from 'expo-router';

import {useSettings} from '@/context/SettingsContext';

export default function AppLayout() {
  const {theme, t} = useSettings();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarStyle: {backgroundColor: theme.surface, borderTopColor: theme.border},
        headerStyle: {backgroundColor: theme.surface},
        headerTintColor: theme.text,
        headerShadowVisible: false,
        sceneStyle: {backgroundColor: theme.background},
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('dashboard'),
          tabBarIcon: ({color, size}) => <Ionicons name="grid-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('settings'),
          tabBarIcon: ({color, size}) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
