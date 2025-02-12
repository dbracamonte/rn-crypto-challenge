import {authService} from '../../services/authService';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
  },
  statusCodes: {
    SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
    IN_PROGRESS: 'IN_PROGRESS',
    PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
  },
}));

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('must log in successfully', async () => {
    const mockUser = {id: '123', email: 'test@example.com'};

    (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
    (GoogleSignin.signIn as jest.Mock).mockResolvedValue({
      type: 'success',
      data: mockUser,
    });

    const user = await authService.signIn();
    expect(user).toEqual(mockUser);
  });

  it('must handle login cancellation', async () => {
    (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
    (GoogleSignin.signIn as jest.Mock).mockRejectedValue({
      code: statusCodes.SIGN_IN_CANCELLED,
    });

    await expect(authService.signIn()).rejects.toThrow(
      'Login cancelled by user',
    );
  });

  it('must handle Play Services error', async () => {
    (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
    (GoogleSignin.signIn as jest.Mock).mockRejectedValue({
      code: statusCodes.PLAY_SERVICES_NOT_AVAILABLE,
    });

    await expect(authService.signIn()).rejects.toThrow(
      'Google Play Services is not available',
    );
  });

  it('must handle other errors in signIn', async () => {
    (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
    (GoogleSignin.signIn as jest.Mock).mockRejectedValue(
      new Error('Unknown error'),
    );

    await expect(authService.signIn()).rejects.toThrow(
      'Login error: Unknown error',
    );
  });

  it('must log out properly', async () => {
    await authService.signOut();
    expect(GoogleSignin.signOut).toHaveBeenCalled();
  });
});
