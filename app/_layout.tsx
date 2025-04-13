import { Stack } from 'expo-router';
import { AuthProvider } from '../context/auth-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colorScheme === 'dark' ? '#121212' : '#FFFFFF',
            },
          }}
        />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
