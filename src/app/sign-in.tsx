import Ionicons from '@expo/vector-icons/Ionicons';
import {useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Button} from '@/components/Button';
import {TextField} from '@/components/TextField';
import {useAuth} from '@/context/AuthContext';
import {useSettings} from '@/context/SettingsContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {email?: string; password?: string};

export default function SignInScreen() {
  const {signIn} = useAuth();
  const {theme, t} = useSettings();
  const passwordRef = useRef<TextInput>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!EMAIL_REGEX.test(email.trim())) {
      next.email = t('invalidEmail');
    }
    if (password.length < 6) {
      next.password = t('shortPassword');
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit() {
    setFormError('');
    if (!validate()) {
      return;
    }
    setLoading(true);
    try {
      // On success the auth guard in the root layout switches to the app automatically.
      await signIn(email, password);
    } catch {
      setFormError(t('invalidCredentials'));
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: theme.background}]}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={[styles.logo, {backgroundColor: theme.primary}]}>
            <Ionicons name="stats-chart" size={32} color={theme.onPrimary} />
          </View>
          <Text style={[styles.title, {color: theme.text}]}>{t('signInTitle')}</Text>
          <Text style={[styles.subtitle, {color: theme.textMuted}]}>{t('signInSubtitle')}</Text>

          {!!formError && (
            <View style={[styles.banner, {borderColor: theme.danger}]} accessibilityLiveRegion="polite">
              <Ionicons name="alert-circle" size={18} color={theme.danger} />
              <Text style={[styles.bannerText, {color: theme.danger}]}>{formError}</Text>
            </View>
          )}

          <View style={styles.form}>
            <TextField
              label={t('email')}
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            <TextField
              ref={passwordRef}
              label={t('password')}
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              placeholder="••••••"
              secureTextEntry
              autoComplete="password"
              textContentType="password"
              returnKeyType="go"
              onSubmitEditing={handleSubmit}
            />
            <Button title={t('signIn')} onPress={handleSubmit} loading={loading} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 24,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  bannerText: {
    flex: 1,
    fontSize: 14,
  },
  form: {
    gap: 16,
  },
});
