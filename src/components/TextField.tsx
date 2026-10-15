import {forwardRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import type {TextInputProps} from 'react-native';

import {useSettings} from '@/context/SettingsContext';

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export const TextField = forwardRef<TextInput, Props>(function TextField({label, error, style, ...inputProps}, ref) {
  const {theme} = useSettings();
  const [focused, setFocused] = useState(false);
  const borderColor = error ? theme.danger : focused ? theme.primary : theme.border;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: theme.textMuted}]}>{label}</Text>
      <TextInput
        ref={ref}
        accessibilityLabel={label}
        placeholderTextColor={theme.textMuted}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[styles.input, {borderColor, color: theme.text, backgroundColor: theme.surface}, style]}
        {...inputProps}
      />
      {!!error && <Text style={[styles.error, {color: theme.danger}]}>{error}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  error: {
    fontSize: 13,
  },
});
