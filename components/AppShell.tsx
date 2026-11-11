import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors } from '@/constants/theme';

interface AppShellProps {
  children: React.ReactNode;
  maxWidth?: number;
}

export function AppShell({ children, maxWidth = 480 }: AppShellProps) {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const themeColors = colors[theme];
  const isWideViewport = width > maxWidth + 24;

  return (
    <View
      style={[
        styles.outerContainer,
        {
          backgroundColor: isWideViewport ? themeColors.outerShellBg : themeColors.background,
        },
      ]}
    >
      <View
        style={[
          styles.innerShell,
          {
            maxWidth,
            backgroundColor: themeColors.background,
            borderColor: themeColors.border,
            shadowColor: themeColors.shadow,
          },
          isWideViewport && styles.wideFrame,
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  innerShell: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  wideFrame: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
});

