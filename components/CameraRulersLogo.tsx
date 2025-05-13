import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Rect, Path, G } from 'react-native-svg';

type CameraRulersLogoProps = {
  size?: number;
  color?: string;
};

export function CameraRulersLogo({ size = 24, color = '#FFFFFF' }: CameraRulersLogoProps) {
  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <G>
          {/* Camera body */}
          <Rect x="2" y="6" width="20" height="12" rx="2" stroke={color} strokeWidth="2" />
          
          {/* Camera lens */}
          <Circle cx="12" cy="14" r="4" stroke={color} strokeWidth="2" />
          
          {/* Camera top */}
          <Path d="M7 6V4C7 3.44772 7.44772 3 8 3H16C16.5523 3 17 3.44772 17 4V6" stroke={color} strokeWidth="2" />
          
          {/* Ruler markings */}
          <Path d="M6 9V11" stroke={color} strokeWidth="1.5" />
          <Path d="M9 9V11" stroke={color} strokeWidth="1.5" />
          <Path d="M15 9V11" stroke={color} strokeWidth="1.5" />
          <Path d="M18 9V11" stroke={color} strokeWidth="1.5" />
          
          <Path d="M4 17H20" stroke={color} strokeWidth="1.5" />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});