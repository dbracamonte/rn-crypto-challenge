// components/FavoriteButton.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FavoriteButton } from '../../components/FavoriteButton';
import { FavoriteIcon } from '../../assets/FavoriteIcon';

jest.mock('../../assets/FavoriteIcon', () => ({
  FavoriteIcon: jest.fn().mockImplementation(
    (props) => <svg {...props} />
  )
}));

describe('<FavoriteButton />', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles press events', () => {
    const { getByTestId } = render(
      <FavoriteButton
        isActive={false}
        onPress={mockOnPress}
      />
    );

    fireEvent.press(getByTestId('favorite-button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('passes correct props to FavoriteIcon when inactive', () => {
    render(
      <FavoriteButton
        isActive={false}
        onPress={mockOnPress}
        size={24}
      />
    );

    expect(FavoriteIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 24,
        fillColor: 'none',
        strokeColor: '#666'
      }),
      expect.any(Object)
    );
  });

  it('passes correct props to FavoriteIcon when active', () => {
    render(
      <FavoriteButton
        isActive={true}
        onPress={mockOnPress}
        size={24}
      />
    );

    expect(FavoriteIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 24,
        fillColor: '#FFD700',
        strokeColor: '#FFD700'
      }),
      expect.any(Object)
    );
  });
});