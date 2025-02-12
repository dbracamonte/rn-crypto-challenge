import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';

interface InfoRowProps {
  label: string;
  value: string;
  textColor?: string;
}

export const InfoRow = ({
  label,
  value,
  textColor
}: InfoRowProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const defaultTextColor = isDarkMode ? '#fff' : '#000';

  return (
    <View style={styles.infoRow}>
      <Text style={[styles.label, { color: isDarkMode ? '#ccc' : '#666' }]}>
        {label}
      </Text>
      <Text style={[styles.value, { color: textColor ?? defaultTextColor }]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
});