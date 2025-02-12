import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import App from '../App';

describe('<App />', () => {
  it('should render the App component', () => {
    const component = render(
      <NavigationContainer>
        <App />
      </NavigationContainer>
    );

    expect(component).toBeDefined();
  });
});