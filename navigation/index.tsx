import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuthStore} from '../stores/auth';
import LoginScreen from '../screens/Login';
import DashboardScreen from '../screens/Dashboard';
import DetailsScreen from '../screens/Details';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Details: {cryptoId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{headerShown: true}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
