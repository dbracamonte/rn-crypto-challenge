export const statusCodes = {
  SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
  IN_PROGRESS: 'IN_PROGRESS',
  PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
  SIGN_IN_REQUIRED: 'SIGN_IN_REQUIRED',
};

export const GoogleSignin = {
  configure: jest.fn(),
  hasPlayServices: jest.fn().mockImplementation(() => Promise.resolve(true)),
  signIn: jest.fn().mockImplementation(() =>
    Promise.resolve({
      user: {
        email: 'test@test.com',
        id: '123',
        givenName: 'Test',
        familyName: 'User',
        photo: 'https://test.com/photo.jpg',
      },
    }),
  ),
  signOut: jest.fn().mockImplementation(() => Promise.resolve(null)),
  revokeAccess: jest.fn().mockImplementation(() => Promise.resolve(null)),
  isSignedIn: jest.fn().mockImplementation(() => Promise.resolve(true)),
  getTokens: jest.fn().mockImplementation(() =>
    Promise.resolve({
      accessToken: 'fake-access-token',
      idToken: 'fake-id-token',
    }),
  ),
  getCurrentUser: jest.fn().mockImplementation(() =>
    Promise.resolve({
      email: 'test@test.com',
      id: '123',
      givenName: 'Test',
      familyName: 'User',
      photo: 'https://test.com/photo.jpg',
    }),
  ),
};

export default {
  GoogleSignin,
  statusCodes,
};
