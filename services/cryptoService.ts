import {API_KEY, BASE_URL} from '@env';

interface CryptoQuote {
  price: number;
  volume_24h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  last_updated: string;
}

export interface Crypto {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  quote: {
    USD: CryptoQuote;
  };
}

interface CoinMarketCapResponse {
  data: Crypto[];
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
  };
}

interface CryptoDetailsResponse {
  data: {
    [key: string]: Crypto;
  };
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
  };
}

class CryptoService {
  async getLatestListings(limit: number = 100): Promise<Crypto[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/cryptocurrency/listings/latest?limit=${limit}`,
        {
          headers: {
            'X-CMC_PRO_API_KEY': API_KEY,
            Accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: CoinMarketCapResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching crypto listings:', error);
      throw error;
    }
  }

  async getCryptoDetails(id: number): Promise<Crypto> {
    try {
      const response = await fetch(
        `${BASE_URL}/cryptocurrency/quotes/latest?id=${id}`,
        {
          headers: {
            'X-CMC_PRO_API_KEY': API_KEY,
            Accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: CryptoDetailsResponse = await response.json();
      return data.data[id];
    } catch (error) {
      console.error('Error fetching crypto details:', error);
      throw error;
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }

  formatPercentage(percent: number): string {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  }
}

export const cryptoService = new CryptoService();
