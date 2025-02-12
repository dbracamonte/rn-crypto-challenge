export const createNativeStackNavigator = () => ({
  Navigator: ({children}: {children: React.ReactNode}) => children,
  Screen: ({children}: {children: React.ReactNode}) => children,
});

export default {
  createNativeStackNavigator,
};
