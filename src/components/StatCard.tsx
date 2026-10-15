import Ionicons from '@expo/vector-icons/Ionicons';
import {StyleSheet, Text, View} from 'react-native';

import {useSettings} from '@/context/SettingsContext';
import {Card} from './Card';

type Props = {
  label: string;
  value: string;
  change: number;
};

export function StatCard({label, value, change}: Props) {
  const {theme} = useSettings();
  const positive = change >= 0;
  const changeColor = positive ? theme.success : theme.danger;

  return (
    <Card style={styles.card}>
      <Text style={[styles.label, {color: theme.textMuted}]}>{label}</Text>
      <Text style={[styles.value, {color: theme.text}]} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      <View style={styles.changeRow}>
        <Ionicons name={positive ? 'trending-up' : 'trending-down'} size={16} color={changeColor} />
        <Text style={[styles.change, {color: changeColor}]}>
          {positive ? '+' : ''}
          {change}%
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: '47%',
    flexGrow: 1,
    gap: 6,
  },
  label: {
    fontSize: 13,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  change: {
    fontSize: 13,
    fontWeight: '600',
  },
});
