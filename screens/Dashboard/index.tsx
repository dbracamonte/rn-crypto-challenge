import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useCryptoStore } from '../../stores/crypto';
import { CryptoList } from './components/List';
import { Toggle } from './components/Toggle';
import { SearchBar } from './components/SearchBar';

export default function DashboardScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    cryptos,
    loading,
    error,
    fetchCryptos,
    isFavorite
  } = useCryptoStore();

  useEffect(() => {
    fetchCryptos();
  }, []);

  const filteredCryptos = useMemo(() => {
    let filtered = cryptos;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(crypto =>
        crypto.name.toLowerCase().includes(query) ||
        crypto.symbol.toLowerCase().includes(query)
      );
    }

    if (showFavorites) {
      filtered = filtered.filter(crypto => isFavorite(crypto.id));
    }

    return filtered;
  }, [cryptos, showFavorites, isFavorite, searchQuery]);

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={[styles.error, { color: isDarkMode ? '#ff6b6b' : '#f44336' }]}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#000' : '#f5f5f5' }
    ]}>
      <View style={styles.header}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Toggle
          showFavorites={showFavorites}
          onToggle={() => setShowFavorites(!showFavorites)}
        />
      </View>
      <View style={styles.divider} />
      <CryptoList
        cryptos={filteredCryptos}
        loading={loading}
        onRefresh={fetchCryptos}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
    margin: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    opacity: 0.1,
  },
});