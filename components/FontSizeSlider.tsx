import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Type } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';

export function FontSizeSlider() {
  const { theme, fontSize, setFontSize } = useTheme();
  const insets = useSafeAreaInsets();
  const themeColors = colors[theme];

  return (
    <View
      pointerEvents="box-none"
      style={[styles.wrapper, { bottom: Math.max(insets.bottom, spacing.md) }]}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: themeColors.card,
            borderColor: themeColors.border,
            shadowColor: themeColors.shadow,
          },
        ]}
      >
        <View style={styles.content}>
          <Type color={themeColors.text} size={20} />
          <Slider
            style={styles.slider}
            minimumValue={18}
            maximumValue={40}
            step={1}
            value={fontSize}
            onValueChange={setFontSize}
            minimumTrackTintColor={themeColors.primary}
            maximumTrackTintColor={themeColors.border}
            thumbTintColor={themeColors.primary}
            accessibilityLabel="Atur ukuran huruf bacaan"
          />
          <Text style={[styles.sizeText, { color: themeColors.text }]}>{fontSize}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 480,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  slider: {
    flex: 1,
    marginHorizontal: spacing.md,
    height: 40,
  },
  sizeText: {
    fontSize: 16,
    fontFamily: 'Amiri-Bold',
    minWidth: 32,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
});
