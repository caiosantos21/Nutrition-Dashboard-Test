import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DailySummaryHeader } from '../components/DailySummaryHeader';
import { TabBar } from '../components/TabBar';
import { TodayScreen } from '../screens/TodayScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { FoodsScreen } from '../screens/FoodsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { dailySummary, tabs } from '../data/mockData';
import { TabKey } from '../types/nutrition';
import { colors } from '../theme/theme';

/**
 * Mapa tab -> tela. Adicionar uma nova aba no futuro é só
 * incluir uma entrada aqui e em `tabs` (mockData) — nada mais muda.
 */
const SCREENS: Record<TabKey, React.FC> = {
  today: TodayScreen,
  history: HistoryScreen,
  foods: FoodsScreen,
  settings: SettingsScreen,
};

export const AppShell: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('today');
  const ActiveScreen = SCREENS[activeTab];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <DailySummaryHeader
        summary={dailySummary}
        currentTime="3:22 PM"
        currentDate="SUN, FEB 1"
      />

      <TabBar tabs={tabs} activeTab={activeTab} onChangeTab={setActiveTab} />

      <ActiveScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.headerBackground,
  },
});
