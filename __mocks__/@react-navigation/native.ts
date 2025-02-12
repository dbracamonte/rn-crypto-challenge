export const useNavigation = jest.fn().mockReturnValue({
  navigate: jest.fn(),
  goBack: jest.fn(),
});

export const useRoute = jest.fn().mockReturnValue({
  params: {},
});

export const NavigationContainer = ({children}: {children: React.ReactNode}) =>
  children;
