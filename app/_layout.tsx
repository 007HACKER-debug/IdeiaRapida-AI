// Powered by OnSpace.AI
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertProvider } from '@/template';
import { IdeasProvider } from '@/contexts/IdeasContext';
import { colors } from '@/constants/theme';

export default function RootLayout() {
  return (
    <AlertProvider>
      <SafeAreaProvider>
        <IdeasProvider>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background },
            }}
          >
            <Stack.Screen name="(tabs)" />
          </Stack>
        </IdeasProvider>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
