import {act} from '@testing-library/react-native';
import {useAuthStore} from '../../stores/auth';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
    });
  });

  it('must have correct initial state', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('must update the user and authentication', () => {
    const user = {
      id: '1',
      name: 'John',
      email: 'john@example.com',
      photo: 'photo_url',
      familyName: 'Doe',
      givenName: 'John',
    };

    act(() => {
      useAuthStore.getState().setUser(user);
    });

    const state = useAuthStore.getState();
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
  });

  it('must log out correctly', () => {
    act(() => {
      useAuthStore.getState().logout();
    });

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
