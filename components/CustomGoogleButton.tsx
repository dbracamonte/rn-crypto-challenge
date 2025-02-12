import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ViewStyle,
  StyleProp,
  ActivityIndicator
} from 'react-native';

interface CustomGoogleButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  isDarkMode?: boolean;
}

export const CustomGoogleButton = ({
  onPress,
  disabled,
  loading,
  style,
  isDarkMode = false
}: CustomGoogleButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        isDarkMode ? styles.buttonDark : styles.buttonLight,
        disabled && styles.buttonDisabled,
        style
      ]}
      testID='google-button'
    >
      {loading ? (
        <ActivityIndicator
        color={isDarkMode ? '#fff' : '#000'}
        testID="loading-indicator"
        />
      ) : (
        <>
          <Image
            source={{ uri: 'google' }}
            style={styles.icon}
          />
          <Text style={[
            styles.text,
            isDarkMode ? styles.textDark : styles.textLight
          ]}>
            Continue with Google
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    width: 280,
    height: 48,
  },
  buttonLight: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonDark: {
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#444',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  textLight: {
    color: '#333',
  },
  textDark: {
    color: '#fff',
  },
});
