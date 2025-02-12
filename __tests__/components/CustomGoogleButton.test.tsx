import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CustomGoogleButton } from '../../components/CustomGoogleButton';

describe('<CustomGoogleButton />', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByTestId, getByText } = render(
      <CustomGoogleButton onPress={mockOnPress} />
    );

    const button = getByTestId('google-button');
    const text = getByText('Continue with Google');

    expect(button).toBeTruthy();
    expect(text).toBeTruthy();
  });

  it('handles press events', () => {
    const { getByTestId } = render(
      <CustomGoogleButton onPress={mockOnPress} />
    );

    fireEvent.press(getByTestId('google-button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    const { queryByText, getByTestId } = render(
      <CustomGoogleButton onPress={mockOnPress} loading={true} />
    );

    expect(queryByText('Continue with Google')).toBeNull();
    expect(getByTestId('google-button')).toBeTruthy();
  });

  it('handles disabled state', () => {
    const { getByTestId } = render(
      <CustomGoogleButton onPress={mockOnPress} disabled={true} />
    );

    fireEvent.press(getByTestId('google-button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

});