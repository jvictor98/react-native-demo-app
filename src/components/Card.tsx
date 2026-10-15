import {StyleSheet, Text, View} from 'react-native';
import type {PropsWithChildren} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';

import {useSettings} from '@/context/SettingsContext';

type Props = PropsWithChildren<{
  title?: string;
  style?: StyleProp<ViewStyle>;
}>;

export function Card({title, style, children}: Props) {
  const {theme} = useSettings();

  return (
    <View style={[styles.card, {backgroundColor: theme.surface, borderColor: theme.border}, style]}>
      {!!title && <Text style={[styles.title, {color: theme.text}]}>{title}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});
