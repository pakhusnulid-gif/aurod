import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Moon, Sun } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing } from '@/constants/theme';

interface NavbarProps {
  title: string;
  showBack?: boolean;
}

export function Navbar({ title, showBack = false }: NavbarProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const themeColors = colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.surface, borderBottomColor: themeColors.border }]}>
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft color={themeColors.text} size={24} />
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
        >
          {theme === 'light' ? (
            <Moon color={themeColors.text} size={24} />
          ) : (
            <Sun color={themeColors.text} size={24} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl + spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leftSection: {
    width: 48,
    alignItems: 'flex-start',
  },
  rightSection: {
    width: 48,
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
  },
  iconButton: {
    padding: spacing.sm,
  },
});
