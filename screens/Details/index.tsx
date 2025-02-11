import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation, type RouteProp } from '@react-navigation/native';
import { InfoRow } from './components/InfoRow';
import { FavoriteIcon } from '../../components/FavoriteIcon';
import { useCryptoStore } from '../../stores/crypto';
import { type Crypto, cryptoService } from '../../services/cryptoService';
import type { RootStackParamList } from '../../navigation';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function DetailsScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const route = useRoute<DetailsScreenRouteProp>();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [crypto, setCrypto] = useState<Crypto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useCryptoStore();

  const fetchCryptoDetails = useCallback(async () => {
    try {
      setError(null);
      setRefreshing(true);
      const data = await cryptoService.getCryptoDetails(route.params.cryptoId);
      setCrypto(data);
    } catch (err) {
      setError('Error loading crypto details');
      console.error('Error:', err);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [route.params.cryptoId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.cryptoName,
    });
  }, [navigation, route.params.cryptoName]);

  useEffect(() => {
    fetchCryptoDetails();
  }, [fetchCryptoDetails]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCryptoDetails();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchCryptoDetails]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#000'} />
      </View>
    );
  }

  if (error || !crypto) {
    return (
      <View style={styles.centerContainer}>
        <Text style={[styles.error, { color: isDarkMode ? '#ff6b6b' : '#f44336' }]}>
          {error || 'Cryptocurrency not found'}
        </Text>
      </View>
    );
  }

  const priceChangeColor = crypto.quote.USD.percent_change_24h >= 0 ? '#4caf50' : '#f44336';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchCryptoDetails}
          tintColor={isDarkMode ? '#f5f5f5' : '#1a1a1a'}
        />
      }
    >
      <View style={[styles.card, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }]}>
        <View style={styles.header}>
          <Text style={[styles.symbol, { color: isDarkMode ? '#f5f5f5' : '#1a1a1a' }]}>
            {crypto.symbol}
          </Text>
          <FavoriteIcon
            isActive={isFavorite(crypto.id)}
            onPress={() => toggleFavorite(crypto.id)}
            size={24}
          />
        </View>

        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: isDarkMode ? '#f5f5f5' : '#1a1a1a' }]}>
            {cryptoService.formatPrice(crypto.quote.USD.price)}
          </Text>
          <Text style={[styles.priceChange, { color: priceChangeColor }]}>
            {cryptoService.formatPercentage(crypto.quote.USD.percent_change_24h)}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statsContainer}>
          <InfoRow
            label="Market Cap"
            value={cryptoService.formatPrice(crypto.quote.USD.market_cap)}
          />
          <InfoRow
            label="24h Volume"
            value={cryptoService.formatPrice(crypto.quote.USD.volume_24h)}
          />
          <InfoRow
            label="24h Change"
            value={cryptoService.formatPercentage(crypto.quote.USD.percent_change_24h)}
            textColor={priceChangeColor}
          />
          <InfoRow
            label="7d Change"
            value={cryptoService.formatPercentage(crypto.quote.USD.percent_change_7d)}
            textColor={crypto.quote.USD.percent_change_7d >= 0 ? '#4caf50' : '#f44336'}
          />
          <InfoRow
            label="30d Change"
            value={cryptoService.formatPercentage(crypto.quote.USD.percent_change_30d)}
            textColor={crypto.quote.USD.percent_change_30d >= 0 ? '#4caf50' : '#f44336'}
          />
          <InfoRow
            label="Market Dominance"
            value={`${crypto.quote.USD.market_cap_dominance.toFixed(2)}%`}
          />
        </View>
      </View>

      <Text style={[styles.updateText, { color: isDarkMode ? '#666' : '#999' }]}>
        Prices update automatically every 30 seconds
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  priceContainer: {
    marginBottom: 24,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  priceChange: {
    fontSize: 18,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    opacity: 0.1,
    marginVertical: 24,
  },
  statsContainer: {
    gap: 16,
  },
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
  updateText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 16,
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
    margin: 16,
  },
});