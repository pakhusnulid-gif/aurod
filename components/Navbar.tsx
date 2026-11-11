import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Moon, Sun } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing } from '@/constants/theme';

interface NavbarProps {
  title: string;
  showBack?: boolean;
}

export function Navbar({ title, showBack = false }: NavbarProps) {
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
          {showBack && (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityRole="button"
              accessibilityLabel="Kembali"
            >
              <ArrowLeft color={themeColors.text} size={22} />
            </TouchableOpacity>
          )}
        </View>

        <Text style={[styles.title, { color: themeColors.text }]} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.rightSection}>
          <TouchableOpacity
            onPress={toggleTheme}
            style={styles.iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            accessibilityLabel={theme === 'light' ? 'Aktifkan mode gelap' : 'Aktifkan mode terang'}
          >
            {theme === 'light' ? (
              <Moon color={themeColors.text} size={22} />
            ) : (
              <Sun color={themeColors.text} size={22} />
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
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  container: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  leftSection: {
    width: 44,
    alignItems: 'flex-start',
  },
  rightSection: {
    width: 44,
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    fontSize: 19,
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
  },
  iconButton: {
    padding: spacing.xs,
  },
});
