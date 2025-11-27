import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Type } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';

export function FontSizeSlider() {
  const { theme, fontSize, setFontSize } = useTheme();
  const themeColors = colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.surface }]}>
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
        />
        <Text style={[styles.sizeText, { color: themeColors.text }]}>{fontSize}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.md,
    right: spacing.md,
    borderRadius: borderRadius.lg,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
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
  },
});
