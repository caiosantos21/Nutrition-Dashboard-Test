import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppShell } from './src/navigation/AppShell';
import { AppDataProvider } from './src/context/AppDataContext';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AppDataProvider>
        <AppShell />
      </AppDataProvider>
    </SafeAreaProvider>
  );
}
