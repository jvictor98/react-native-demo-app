import {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';

import {BarChart} from '@/components/BarChart';
import {Button} from '@/components/Button';
import {Card} from '@/components/Card';
import {StatCard} from '@/components/StatCard';
import {useAuth} from '@/context/AuthContext';
import {useSettings} from '@/context/SettingsContext';
import {fetchDashboard, type DashboardData} from '@/data/api';

export default function DashboardScreen() {
  const {user} = useAuth();
  const {theme, t, language} = useSettings();

  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setError(false);
    try {
      setData(await fetchDashboard());
    } catch {
      setError(true);
    }
  }, []);

  // Initial load; the `active` flag ignores the response if the screen unmounts first.
  useEffect(() => {
    let active = true;
    fetchDashboard()
      .then(result => active && setData(result))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const locale = language === 'pt' ? 'pt-BR' : 'en-US';
  const money = (value: number) =>
    new Intl.NumberFormat(locale, {style: 'currency', currency: 'USD'}).format(value);
  const number = (value: number) => new Intl.NumberFormat(locale).format(value);

  if (error && !data) {
    return (
      <View style={styles.center}>
        <Text style={[styles.errorText, {color: theme.text}]}>{t('loadError')}</Text>
        <Button title={t('retry')} onPress={load} />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}>
      <Text style={[styles.greeting, {color: theme.text}]}>
        {t('hello')}, {user?.name.split(' ')[0]} 👋
      </Text>

      <View style={styles.grid}>
        <StatCard label={t('monthlyRevenue')} value={money(data.monthlyRevenue)} change={data.monthlyRevenueChange} />
        <StatCard label={t('activeUsers')} value={number(data.activeUsers)} change={data.activeUsersChange} />
        <StatCard label={t('averageTicket')} value={money(data.averageTicket)} change={data.averageTicketChange} />
        <StatCard label={t('satisfaction')} value={`${data.satisfaction}%`} change={data.satisfactionChange} />
      </View>

      <Card title={t('revenueByMonth')}>
        <BarChart data={data.revenueByMonth} />
      </Card>

      <Card title={t('recentActivity')}>
        {data.activity.map((item, index) => (
          <View
            key={item.id}
            style={[styles.activityRow, index > 0 && {borderTopWidth: 1, borderTopColor: theme.border}]}>
            <View style={styles.flex}>
              <Text style={[styles.activityTitle, {color: theme.text}]}>{item.title}</Text>
              <Text style={[styles.activityDate, {color: theme.textMuted}]}>{item.date}</Text>
            </View>
            <Text style={[styles.activityAmount, {color: item.amount < 0 ? theme.danger : theme.success}]}>
              {money(item.amount)}
            </Text>
          </View>
        ))}
      </Card>
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 24,
  },
  errorText: {
    fontSize: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  flex: {
    flex: 1,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  activityDate: {
    fontSize: 13,
    marginTop: 2,
  },
  activityAmount: {
    fontSize: 15,
    fontWeight: '600',
  },
});
