import Ionicons from '@expo/vector-icons/Ionicons';
import type {ComponentProps, ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useSettings} from '@/context/SettingsContext';

type Props = {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  right?: ReactNode;
};

export function SettingRow({icon, label, right}: Props) {
  const {theme} = useSettings();

  return (
    <View style={styles.row}>
      <View style={[styles.iconBox, {backgroundColor: theme.background}]}>
        <Ionicons name={icon} size={18} color={theme.primary} />
      </View>
      <Text style={[styles.label, {color: theme.text}]}>{label}</Text>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 44,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
});
