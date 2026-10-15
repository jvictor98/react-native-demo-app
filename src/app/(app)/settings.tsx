import Constants from 'expo-constants';
import {Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View} from 'react-native';

import {Button} from '@/components/Button';
import {Card} from '@/components/Card';
import {SettingRow} from '@/components/SettingRow';
import {useAuth} from '@/context/AuthContext';
import {useSettings} from '@/context/SettingsContext';
import type {Language} from '@/i18n/strings';

const LANGUAGES: {value: Language; label: string}[] = [
  {value: 'en', label: 'EN'},
  {value: 'pt', label: 'PT'},
];

export default function SettingsScreen() {
  const {user, signOut} = useAuth();
  const {theme, t, notifications, language, update} = useSettings();

  function confirmSignOut() {
    Alert.alert(t('signOut'), user?.email, [
      {text: t('cancel'), style: 'cancel'},
      {text: t('signOut'), style: 'destructive', onPress: signOut},
    ]);
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Card>
        <View style={styles.profile}>
          <View style={[styles.avatar, {backgroundColor: theme.primary}]}>
            <Text style={[styles.avatarText, {color: theme.onPrimary}]}>{user?.name.charAt(0)}</Text>
          </View>
          <View>
            <Text style={[styles.name, {color: theme.text}]}>{user?.name}</Text>
            <Text style={{color: theme.textMuted}}>{user?.email}</Text>
          </View>
        </View>
      </Card>

      <Card title={t('appearance')}>
        <SettingRow
          icon="moon-outline"
          label={t('darkMode')}
          right={
            <Switch
              value={theme.dark}
              onValueChange={value => update({darkMode: value})}
              trackColor={{true: theme.primary}}
            />
          }
        />
      </Card>

      <Card title={t('preferences')}>
        <SettingRow
          icon="notifications-outline"
          label={t('notifications')}
          right={
            <Switch
              value={notifications}
              onValueChange={value => update({notifications: value})}
              trackColor={{true: theme.primary}}
            />
          }
        />
        <SettingRow
          icon="language-outline"
          label={t('language')}
          right={
            <View style={[styles.segment, {borderColor: theme.border}]}>
              {LANGUAGES.map(option => {
                const selected = option.value === language;
                return (
                  <Pressable
                    key={option.value}
                    accessibilityRole="button"
                    accessibilityState={{selected}}
                    onPress={() => update({language: option.value})}
                    style={[styles.segmentItem, selected && {backgroundColor: theme.primary}]}>
                    <Text style={{color: selected ? theme.onPrimary : theme.text, fontWeight: '600'}}>
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          }
        />
      </Card>

      <Card title={t('account')}>
        <Button title={t('signOut')} onPress={confirmSignOut} variant="danger" />
      </Card>

      <Text style={[styles.version, {color: theme.textMuted}]}>
        {t('version')} {Constants.expoConfig?.version}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 16,
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '700',
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
  },
  segment: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  segmentItem: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  version: {
    textAlign: 'center',
    fontSize: 13,
  },
});
