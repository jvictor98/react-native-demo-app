import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';

import {useSettings} from '@/context/SettingsContext';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'danger';
};

export function Button({title, onPress, loading = false, variant = 'primary'}: Props) {
  const {theme} = useSettings();
  const background = variant === 'danger' ? theme.danger : theme.primary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{disabled: loading, busy: loading}}
      disabled={loading}
      onPress={onPress}
      style={({pressed}) => [styles.button, {backgroundColor: background, opacity: pressed || loading ? 0.8 : 1}]}>
      {loading ? (
        <ActivityIndicator color={theme.onPrimary} />
      ) : (
        <Text style={[styles.title, {color: theme.onPrimary}]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});
