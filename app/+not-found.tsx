import React from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppShell } from '@/components/AppShell';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';

export default function NotFoundScreen() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  return (
    <AppShell maxWidth={480}>
      <Stack.Screen options={{ title: 'Halaman Tidak Ditemukan' }} />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.title, { color: themeColors.text }]}>
          Halaman tidak tersedia.
        </Text>
        <Link href="/" asChild>
          <TouchableOpacity
            activeOpacity={0.8}
            accessibilityRole="button"
            style={[
              styles.link,
              { backgroundColor: themeColors.primary, borderRadius: borderRadius.md },
            ]}
          >
            <Text style={[styles.linkText, { color: themeColors.onPrimary }]}>
              Kembali ke Beranda
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  link: {
    marginTop: spacing.md,
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 4,
    justifyContent: 'center',
  },
  linkText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
