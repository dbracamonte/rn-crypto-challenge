import {act} from '@testing-library/react-native';
import {useCryptoStore} from '../../stores/crypto';
import {cryptoService} from '../../services/cryptoService';

jest.mock('../../services/cryptoService', () => {
  return {
    cryptoService: {
      getLatestListings: jest.fn(),
    },
  };
});

describe('useCryptoStore', () => {
  beforeEach(() => {
    useCryptoStore.setState({
      cryptos: [],
      favorites: [],
      loading: false,
      error: null,
    });
  });

  it('must have correct initial state', () => {
    const state = useCryptoStore.getState();
    expect(state.cryptos).toEqual([]);
    expect(state.favorites).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('must add and remove favorites correctly', () => {
    act(() => {
      useCryptoStore.getState().toggleFavorite(1);
    });

    let state = useCryptoStore.getState();
    expect(state.favorites).toContain(1);

    act(() => {
      useCryptoStore.getState().toggleFavorite(1);
    });

    state = useCryptoStore.getState();
    expect(state.favorites).not.toContain(1);
  });

  it('must detect if an item is a favorite', () => {
    act(() => {
      useCryptoStore.getState().toggleFavorite(2);
    });

    expect(useCryptoStore.getState().isFavorite(2)).toBe(true);
    expect(useCryptoStore.getState().isFavorite(3)).toBe(false);
  });

  it('must handle errors in fetchCryptos', async () => {
    (cryptoService.getLatestListings as jest.Mock).mockRejectedValue(
      new Error('Error API'),
    );

    await act(async () => {
      await useCryptoStore.getState().fetchCryptos();
    });

    expect(useCryptoStore.getState().error).toBe(
      'Error loading cryptocurrencies',
    );
    expect(useCryptoStore.getState().loading).toBe(false);
  });

  it('must load cryptos correctly', async () => {
    const mockCryptos = [{id: 1, name: 'Bitcoin'}];
    (cryptoService.getLatestListings as jest.Mock).mockResolvedValue(
      mockCryptos,
    );

    await act(async () => {
      await useCryptoStore.getState().fetchCryptos();
    });

    expect(useCryptoStore.getState().cryptos).toEqual(mockCryptos);
    expect(useCryptoStore.getState().loading).toBe(false);
  });
});
