import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import {
  cryptoService,
  type Crypto,
} from '../../../../services/cryptoService';
import { useCryptoStore } from '../../../../stores/crypto';
import { FavoriteIcon } from '../../../../components/FavoriteIcon';

interface CryptoListProps {
  cryptos: Crypto[];
  loading: boolean;
  onRefresh: () => void;
}

export const CryptoList = ({ cryptos, loading, onRefresh }: CryptoListProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { toggleFavorite, isFavorite } = useCryptoStore();

  const renderItem = ({ item }: { item: Crypto }) => (
    <View style={[
      styles.cryptoItem,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }
    ]}>
      <FavoriteIcon
        isFavorite={isFavorite(item.id)}
        onPress={() => toggleFavorite(item.id)}
        size={20}
      />
      <View style={styles.content}>
        <View style={styles.cryptoInfo}>
          <Text style={[
            styles.cryptoSymbol,
            { color: isDarkMode ? '#fff' : '#000' }
          ]}>
            {item.symbol}
          </Text>
          <Text style={[
            styles.cryptoName,
            { color: isDarkMode ? '#ccc' : '#666' }
          ]}>
            {item.name}
          </Text>
        </View>
      </View>

      <View style={styles.priceInfo}>
        <Text style={[
          styles.price,
          { color: isDarkMode ? '#fff' : '#000' }
        ]}>
          {cryptoService.formatPrice(item.quote.USD.price)}
        </Text>
        <Text style={[
          styles.change,
          { color: item.quote.USD.percent_change_24h >= 0 ? '#4caf50' : '#f44336' }
        ]}>
          {cryptoService.formatPercentage(item.quote.USD.percent_change_24h)}
        </Text>
      </View>
    </View>
  );

  if (cryptos.length === 0 && loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#000'} />
      </View>
    );
  }

  return (
    <FlatList
      data={cryptos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          tintColor={isDarkMode ? '#fff' : '#000'}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cryptoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cryptoInfo: {
    flex: 1,
  },
  cryptoSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cryptoName: {
    fontSize: 14,
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  change: {
    fontSize: 14,
    fontWeight: '500',
  },
});