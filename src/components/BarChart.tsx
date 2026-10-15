import {StyleSheet, Text, View} from 'react-native';

import {useSettings} from '@/context/SettingsContext';

type Props = {
  data: {label: string; value: number}[];
  height?: number;
};

// Simple bar chart built with plain Views: no extra native dependency needed.
export function BarChart({data, height = 140}: Props) {
  const {theme} = useSettings();
  const max = Math.max(...data.map(item => item.value), 1);

  return (
    <View style={[styles.chart, {height: height + 24}]}>
      {data.map(item => (
        <View key={item.label} style={styles.column} accessibilityLabel={`${item.label}: ${item.value}`}>
          <View style={[styles.track, {height}]}>
            <View
              style={[styles.bar, {height: (item.value / max) * height, backgroundColor: theme.primary}]}
            />
          </View>
          <Text style={[styles.label, {color: theme.textMuted}]}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  track: {
    justifyContent: 'flex-end',
    width: '55%',
  },
  bar: {
    width: '100%',
    borderRadius: 6,
  },
  label: {
    fontSize: 12,
  },
});
