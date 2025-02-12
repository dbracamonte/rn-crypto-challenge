import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SearchIconProps {
  strokeColor?: string;
}

export const SearchIcon = ({
  strokeColor = '#999',
}: SearchIconProps) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={2}>
      <Path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" />
      <Path d="M21 21L16.65 16.65" />
    </Svg>
  );
};
