import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface FavoriteIconProps {
  fillColor: string;
  strokeColor: string;
  size?: number;
}

export const FavoriteIcon = ({
  fillColor = 'none',
  strokeColor = '#666',
  size = 24
}: FavoriteIconProps) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={2}
    >
      <Path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      />
    </Svg>
  );
};
