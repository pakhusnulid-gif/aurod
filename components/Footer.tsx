import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing } from '@/constants/theme';

export function Footer() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const handlePress = () => {
    Linking.openURL('https://pakhusnul.id');
  };

  return (
    <View style={styles.container}>
      <View style={styles.appInfo}>
        <Text style={[styles.appName, { color: themeColors.textSecondary }]}>
          Aurod An-Nidhomiyyah
        </Text>
        <Text style={[styles.version, { color: themeColors.textSecondary }]}>
          v1.0.0
        </Text>
      </View>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
        <Text style={[styles.credit, { color: themeColors.textSecondary }]}>
          Developed by{' '}
          <Text style={[styles.link, { color: themeColors.primary }]}>
            pakhusnul.id
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    marginTop: spacing.xl,
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.xs,
  },
  appName: {
    fontSize: 11,
    fontWeight: '600',
  },
  version: {
    fontSize: 10,
    fontWeight: '400',
  },
  credit: {
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'center',
  },
  link: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
