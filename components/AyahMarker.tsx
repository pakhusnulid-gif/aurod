import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp, Platform } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '@/contexts/ThemeContext';
import { getArabicFontFamily } from '@/constants/arabicFonts';
import { toArabicDigits } from '@/utils/arabicNumerals';

interface AyahMarkerProps {
  number: number | string;
  size?: number;
  color?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
}

// 12-lobed Quranic rosette path for 32x32 viewBox
const ROSETTE_PATH =
  'M27.40,16.00 Q30.49,19.88 25.87,21.70 Q26.61,26.61 21.70,25.87 Q19.88,30.49 16.00,27.40 Q12.12,30.49 10.30,25.87 Q5.39,26.61 6.13,21.70 Q1.51,19.88 4.60,16.00 Q1.51,12.12 6.13,10.30 Q5.39,5.39 10.30,6.13 Q12.12,1.51 16.00,4.60 Q19.88,1.51 21.70,6.13 Q26.61,5.39 25.87,10.30 Q30.49,12.12 27.40,16.00 Z';

export const AyahMarker: React.FC<AyahMarkerProps> = ({
  number,
  size = 28,
  color = '#C5A880', // Elegant Quranic gold accent matching NU Online
  textColor,
  style,
}) => {
  const { arabicFont } = useTheme();
  const arabicFontFamily = getArabicFontFamily(arabicFont, 'bold');
  const arabicStr = toArabicDigits(number);
  const isTwoOrMoreDigits = arabicStr.length >= 2;
  const numFontSize = Math.round(size * (isTwoOrMoreDigits ? 0.38 : 0.44));

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
        },
        style,
      ]}
      accessibilityLabel={`Ayat ${number}`}
    >
      <Svg width={size} height={size} viewBox="0 0 32 32" style={StyleSheet.absoluteFill}>
        {/* Outer 12-lobed decorative rosette */}
        <Path
          d={ROSETTE_PATH}
          stroke={color}
          strokeWidth="1.15"
          fill="none"
        />
        {/* Inner concentric ring */}
        <Circle
          cx="16"
          cy="16"
          r="10.5"
          stroke={color}
          strokeWidth="0.8"
          fill="none"
          opacity={0.85}
        />
      </Svg>

      <Text
        style={[
          styles.numberText,
          {
            fontFamily: arabicFontFamily,
            fontSize: numFontSize,
            lineHeight: Math.round(numFontSize * 1.2),
            color: textColor || color,
          },
        ]}
      >
        {arabicStr}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    alignSelf: 'center',
    ...Platform.select({
      web: {
        display: 'inline-flex' as any,
        verticalAlign: 'middle',
      },
    }),
  },
  numberText: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    writingDirection: 'rtl',
    includeFontPadding: false,
    userSelect: 'none',
  },
});

