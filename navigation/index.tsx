import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../stores/auth';
import LoginScreen from '../screens/Login';
import DashboardScreen from '../screens/Dashboard';
import DetailsScreen from '../screens/Details';
import { Alert, Image, TouchableOpacity, useColorScheme, View } from 'react-native';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Details: { cryptoId: number, cryptoName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  const isDarkMode = useColorScheme() === 'dark';
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);

  const logout = useAuthStore(state => state.logout);

  const handlePressImage = () =>
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: () => logout() },
    ]);

    const headerOptions = {
      headerShown: true,
      headerTintColor: isDarkMode ? '#fff' : '#000',
      headerStyle: {
        backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5'
      }
    };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
      }}>
        {!isAuthenticated ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{
                ...headerOptions,
                headerRight: () => {
                  return (
                    <TouchableOpacity
                      style={{ marginRight: 0 }}
                      onPress={handlePressImage}
                    >
                      <Image
                        source={{ uri: user?.photo ?? 'logo' }}
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 6,
                          borderWidth: 1,
                          borderColor: !isDarkMode ? '#1a1a1a' : '#f5f5f5'
                        }}
                      />
                    </TouchableOpacity>
                  );
                },
              }}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{
                ...headerOptions,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
