import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import {WEB_CLIENT_ID, IOS_CLIENT_ID} from '@env';

class AuthService {
  constructor() {
    const config = {
      webClientId: WEB_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      forceCodeForRefreshToken: false,
    };

    GoogleSignin.configure(config);
  }

  async signIn(): Promise<User | null> {
    try {
      await GoogleSignin.hasPlayServices();
      const { type, data } = await GoogleSignin.signIn();

      if (type === 'success') {
        return data;
      }
      return null;
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error('Login cancelado por el usuario');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        throw new Error('Operación en progreso');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error('Google Play Services no está disponible');
      } else {
        throw new Error('Error en el login: ' + error.message);
      }
    }
  }

  async signOut(): Promise<void> {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();
