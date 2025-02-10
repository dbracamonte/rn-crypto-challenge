import React from 'react';
import { FavoriteIcon } from '../../../../components/FavoriteIcon';

interface ToggleProps {
  showFavorites: boolean;
  onToggle: () => void;
}

export const Toggle = ({ showFavorites, onToggle }: ToggleProps) => (
  <FavoriteIcon
    isActive={showFavorites}
    onPress={onToggle}
    size={28}
  />
);
