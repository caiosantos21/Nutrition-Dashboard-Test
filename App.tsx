import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppShell } from './src/navigation/AppShell';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AppShell />
    </SafeAreaProvider>
  );
}
