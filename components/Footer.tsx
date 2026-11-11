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
    <View style={[styles.container, { borderTopColor: themeColors.border }]}>
      <Text style={[styles.appName, { color: themeColors.textSecondary }]}>
        Aurod An-Nidhomiyyah
      </Text>
      <Text style={[styles.pesantren, { color: themeColors.textSecondary }]}>
        Pondok Pesantren An-Nidhomiyyah Tuban
      </Text>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        accessibilityRole="link"
        accessibilityLabel="Kunjungi situs pengembang pakhusnul.id"
      >
        <Text style={[styles.credit, { color: themeColors.textSecondary }]}>
          Dikembangkan oleh{' '}
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
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
    marginTop: spacing.xl,
    borderTopWidth: 1,
  },
  appName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  pesantren: {
    fontSize: 11,
    fontWeight: '400',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  credit: {
    fontSize: 11,
    fontWeight: '400',
    textAlign: 'center',
  },
  link: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
