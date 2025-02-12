import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FavoriteIcon } from '../assets/FavoriteIcon';

interface FavoriteButtonProps {
  isActive: boolean;
  onPress: () => void;
  size?: number;
}

export const FavoriteButton = ({
  isActive,
  onPress,
  size = 24
}: FavoriteButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      testID={'favorite-button'}
    >
      <FavoriteIcon
        size={size}
        fillColor={isActive ? '#FFD700' : 'none'}
        strokeColor={isActive ? '#FFD700' : '#666'}
      />
    </TouchableOpacity>
  );
};
