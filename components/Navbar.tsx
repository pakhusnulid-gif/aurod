import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Moon, Repeat, Sun, Type } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';

const LOGO_PESANTREN = require('@/assets/images/logo-pesantren.jpg');

interface NavbarProps {
  title: string;
  showBack?: boolean;
  showBrandLogo?: boolean;
  showReadingSettings?: boolean;
  onOpenReadingSettings?: () => void;
  showTasbih?: boolean;
  onOpenTasbih?: () => void;
}

export function Navbar({
  title,
  showBack = false,
  showBrandLogo = false,
  showReadingSettings = false,
  onOpenReadingSettings,
  showTasbih = false,
  onOpenTasbih,
}: NavbarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme, toggleTheme } = useTheme();
  const themeColors = colors[theme];

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: themeColors.surface,
          borderBottomColor: themeColors.border,
          shadowColor: themeColors.shadow,
          paddingTop: Math.max(insets.top, spacing.sm) + spacing.xs,
        },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.leftSection}>
          {showBack ? (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconButton}
              accessibilityRole="button"
              accessibilityLabel="Kembali"
            >
              <ArrowLeft color={themeColors.text} size={22} />
            </TouchableOpacity>
          ) : showBrandLogo ? (
            <Image
              source={LOGO_PESANTREN}
              style={styles.brandLogo}
              accessibilityLabel="Logo Pondok Pesantren An-Nidhomiyyah"
            />
          ) : null}
        </View>

        <Text
          style={[styles.title, { color: themeColors.text }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.82}
        >
          {title}
        </Text>

        <View style={styles.rightSection}>
          {showTasbih && onOpenTasbih && (
            <TouchableOpacity
              onPress={onOpenTasbih}
              style={styles.iconButton}
              accessibilityRole="button"
              accessibilityLabel="Buka penghitung tasbih"
            >
              <Repeat color={themeColors.text} size={20} />
            </TouchableOpacity>
          )}
          {showReadingSettings && onOpenReadingSettings && (
            <TouchableOpacity
              onPress={onOpenReadingSettings}
              style={styles.iconButton}
              accessibilityRole="button"
              accessibilityLabel="Pengaturan ukuran huruf dan tampilan bacaan"
            >
              <Type color={themeColors.text} size={20} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={toggleTheme}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel={theme === 'light' ? 'Aktifkan mode gelap' : 'Aktifkan mode terang'}
          >
            {theme === 'light' ? (
              <Moon color={themeColors.text} size={21} />
            ) : (
              <Sun color={themeColors.text} size={21} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    paddingBottom: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
    gap: spacing.xs,
  },
  leftSection: {
    minWidth: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightSection: {
    minWidth: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  brandLogo: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
  },
  iconButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.sm,
  },
});
