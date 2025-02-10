// src/stores/cryptoStore.ts
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {type Crypto, cryptoService} from '../services/cryptoService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CryptoState {
  cryptos: Crypto[];
  favorites: number[]; // Array de IDs de criptomonedas favoritas
  loading: boolean;
  error: string | null;
  fetchCryptos: () => Promise<void>;
  toggleFavorite: (cryptoId: number) => void;
  isFavorite: (cryptoId: number) => boolean;
}

export const useCryptoStore = create<CryptoState>()(
  persist(
    (set, get) => ({
      cryptos: [],
      favorites: [],
      loading: false,
      error: null,
      fetchCryptos: async () => {
        try {
          set({loading: true, error: null});
          const data = await cryptoService.getLatestListings();
          set({cryptos: data, loading: false});
        } catch (error) {
          set({error: 'Error al cargar las criptomonedas', loading: false});
        }
      },
      toggleFavorite: (cryptoId: number) => {
        const {favorites} = get();
        const isFavorite = favorites.includes(cryptoId);

        if (isFavorite) {
          set({favorites: favorites.filter(id => id !== cryptoId)});
        } else {
          set({favorites: [...favorites, cryptoId]});
        }
      },
      isFavorite: (cryptoId: number) => {
        return get().favorites.includes(cryptoId);
      },
    }),
    {
      name: 'crypto-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({favorites: state.favorites}), // Solo persistimos los favoritos
    },
  ),
);
