import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Navbar } from '@/components/Navbar';
import { DigitalClock } from '@/components/DigitalClock';
import { PrayerTimes } from '@/components/PrayerTimes';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';
import { BookOpen, ScrollText, Hand, Layers } from 'lucide-react-native';

interface MenuItem {
  id: number;
  title: string;
  subtitle: string;
  route: '/yasin' | '/aurod' | '/tawassul' | '/tahlil';
  icon: typeof BookOpen;
  color: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    title: 'Yasin Fadhilah',
    subtitle: 'Surat Yasin & Doa',
    route: '/yasin',
    icon: BookOpen,
    color: '#047857',
  },
  {
    id: 2,
    title: 'Aurod',
    subtitle: 'Wirid Harian',
    route: '/aurod',
    icon: ScrollText,
    color: '#0F766E',
  },
  {
    id: 3,
    title: 'Tawassul',
    subtitle: 'Kirimkan Doa',
    route: '/tawassul',
    icon: Hand,
    color: '#065F46',
  },
  {
    id: 4,
    title: 'Tahlil',
    subtitle: 'Bacaan Tahlil',
    route: '/tahlil',
    icon: Layers,
    color: '#115E59',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const menuRows = [MENU_ITEMS.slice(0, 2), MENU_ITEMS.slice(2, 4)];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Navbar title="Aurod An-Nidhomiyyah" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Text style={[styles.mainTitle, { color: themeColors.primary }]}>
            Amalan Santri
          </Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Pondok Pesantren An-Nidhomiyyah
          </Text>
        </View>

        <DigitalClock />
        <PrayerTimes />

        <View style={styles.menuSection}>
          {menuRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.gridRow}>
              {row.map((item) => {
                const IconComponent = item.icon;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.gridCard,
                      {
                        backgroundColor: themeColors.card,
                        borderColor: themeColors.border,
                        shadowColor: themeColors.shadow,
                      },
                    ]}
                    onPress={() => router.push(item.route)}
                    activeOpacity={0.75}
                    accessibilityRole="button"
                    accessibilityLabel={`${item.title}, ${item.subtitle}`}
                  >
                    <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                      <IconComponent color="#F8FAF9" size={28} />
                    </View>
                    <Text style={[styles.cardTitle, { color: themeColors.text }]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.cardSubtitle, { color: themeColors.textSecondary }]}>
                      {item.subtitle}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  menuSection: {
    width: '100%',
    maxWidth: 520,
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  gridRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  gridCard: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    minHeight: 164,
    justifyContent: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
    userSelect: 'none',
  },
  cardSubtitle: {
    fontSize: 12,
    textAlign: 'center',
    userSelect: 'none',
  },
});
