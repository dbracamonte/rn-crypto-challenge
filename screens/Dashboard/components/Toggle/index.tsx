import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';

interface ToggleProps {
  showFavorites: boolean;
  onToggle: () => void;
}

export const Toggle = ({ showFavorites, onToggle }: ToggleProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.toggle,
          {
            backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
            borderColor: showFavorites ? '#FFD700' : isDarkMode ? '#333' : '#e0e0e0',
          },
        ]}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={[
          styles.indicator,
          {
            backgroundColor: showFavorites ? '#FFD700' : isDarkMode ? '#333' : '#e0e0e0',
            transform: [{ translateX: showFavorites ? 24 : 0 }],
          },
        ]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  toggle: {
    width: 48,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    padding: 2,
  },
  indicator: {
    width: 18,
    height: 18,
    borderRadius: 9,
    position: 'absolute',
    top: 2,
    left: 2,
  },
});
