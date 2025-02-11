import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { authService } from '../../services/authService';
import { useAuthStore } from '../../stores/auth';
import { CustomGoogleButton } from '../../components/CustomGoogleButton';

export default function LoginScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const data = await authService.signIn();
      if (data?.user) {
        setUser(data.user);
      }
    } catch (error) {
      Alert.alert(
        'Error de autenticación',
        'No se pudo iniciar sesión con Google. Por favor, intenta de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }
    ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#f5f5f5'}
      />
      <View style={styles.main}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'logo' }}
            resizeMode='contain'
            style={styles.logo}
          />
          <Text style={[
            styles.title,
            { color: isDarkMode ? '#ccc' : '#666' }
          ]}>
            Crypto Tracker
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={[
            styles.subtitle,
            { color: isDarkMode ? '#ccc' : '#666' }
          ]}>
            Inicia sesión para ver las últimas cotizaciones
          </Text>
          <CustomGoogleButton
            onPress={handleGoogleSignIn}
            loading={loading}
            disabled={loading}
            isDarkMode={isDarkMode}
            style={styles.button}
          />
        </View>

        <Text style={[
          styles.version,
          { color: isDarkMode ? '#666' : '#999' }
        ]}>
          Version 1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 16,
  },
  version: {
    fontSize: 12,
  },
});