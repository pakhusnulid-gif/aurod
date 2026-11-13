import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '@/contexts/ThemeContext';
import { colors } from '@/constants/theme';
import { getArabicFontFamily } from '@/constants/arabicFonts';
import { toArabicDigits } from '@/utils/arabicNumerals';

interface AyahMarkerProps {
  number: number | string;
  size?: number;
  color?: string;
  textColor?: string;
  opacity?: number;
  style?: StyleProp<ViewStyle>;
}

// 12-lobed Quranic rosette path for 32x32 viewBox
const ROSETTE_PATH =
  'M27.40,16.00 Q30.49,19.88 25.87,21.70 Q26.61,26.61 21.70,25.87 Q19.88,30.49 16.00,27.40 Q12.12,30.49 10.30,25.87 Q5.39,26.61 6.13,21.70 Q1.51,19.88 4.60,16.00 Q1.51,12.12 6.13,10.30 Q5.39,5.39 10.30,6.13 Q12.12,1.51 16.00,4.60 Q19.88,1.51 21.70,6.13 Q26.61,5.39 25.87,10.30 Q30.49,12.12 27.40,16.00 Z';

export const AyahMarker: React.FC<AyahMarkerProps> = ({
  number,
  size = 36,
  color = '#C5A880', // Elegant Quranic gold accent matching NU Online
  textColor,
  opacity,
  style,
}) => {
  const { theme, arabicFont } = useTheme();
  const themeColors = colors[theme];
  const arabicFontFamily = getArabicFontFamily(arabicFont, 'bold');
  const arabicStr = toArabicDigits(number);

  // Dynamic font size: ~65% of rosette diameter for single digits, ~60% for 2 digits (60-70% range)
  const isTwoOrMoreDigits = arabicStr.length >= 2;
  const numFontSize = Math.round(size * (isTwoOrMoreDigits ? 0.60 : 0.65));

  // High contrast text with more subdued rosette ornament
  const effectiveTextColor = textColor || themeColors.text;
  const rosetteOpacity = opacity ?? (theme === 'dark' ? 0.65 : 0.55);

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
        {/* Single 12-lobed Quranic rosette with open, roomy center (inner ring removed) */}
        <Path
          d={ROSETTE_PATH}
          stroke={color}
          strokeWidth="1.15"
          fill="none"
          opacity={rosetteOpacity}
        />
      </Svg>

      <View style={styles.numberWrapper} pointerEvents="none">
        <Text
          style={[
            styles.numberText,
            {
              fontFamily: arabicFontFamily,
              fontSize: numFontSize,
              lineHeight: Math.round(numFontSize * 1.1),
              color: effectiveTextColor,
            },
          ]}
        >
          {arabicStr}
        </Text>
      </View>
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
  numberWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontWeight: 'bold',
    textAlign: 'center',
    writingDirection: 'rtl',
    includeFontPadding: false,
    textAlignVertical: 'center',
    userSelect: 'none',
  },
});

