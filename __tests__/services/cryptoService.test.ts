import {cryptoService} from '../../services/cryptoService';

global.fetch = jest.fn();

describe('CryptoService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('must obtain the cryptocurrencies correctly', async () => {
    const mockResponse = {
      data: [{id: 1, name: 'Bitcoin'}],
      status: {error_code: 0, error_message: null},
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await cryptoService.getLatestListings();
    expect(result).toEqual(mockResponse.data);
  });

  it('must handle errors in getLatestListings', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(cryptoService.getLatestListings()).rejects.toThrow(
      'Network response was not ok',
    );

    consoleErrorSpy.mockRestore();
  });

  it('must get details of a cryptocurrency correctly', async () => {
    const mockResponse = {
      data: {1: {id: 1, name: 'Bitcoin'}},
      status: {error_code: 0, error_message: null},
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await cryptoService.getCryptoDetails(1);
    expect(result).toEqual(mockResponse.data[1]);
  });

  it('must handle errors in getCryptoDetails', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(cryptoService.getCryptoDetails(1)).rejects.toThrow(
      'Network response was not ok',
    );

    consoleErrorSpy.mockRestore();
  });

  it('must format prices correctly', () => {
    expect(cryptoService.formatPrice(1234.56)).toBe('$1,234.56');
  });

  it('must format percentages correctly', () => {
    expect(cryptoService.formatPercentage(5.678)).toBe('+5.68%');
    expect(cryptoService.formatPercentage(-2.345)).toBe('-2.35%');
  });
});
