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

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const menuItems = [
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
      color: '#0d9488',
    },
    {
      id: 3,
      title: 'Tawassul',
      subtitle: 'Kirimkan Doa',
      route: '/tawassul',
      icon: Hand,
      color: '#0891b2',
    },
    {
      id: 4,
      title: 'Tahlil',
      subtitle: 'Bacaan Tahlil',
      route: '/tahlil',
      icon: Layers,
      color: '#7c3aed',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Navbar title="Aurod An-Anidhomiyyah" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Text style={styles.mainTitle}>Amalan Santri</Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Pondok Pesantren An-Nidhomiyyah
          </Text>
        </View>

        <DigitalClock />
        <PrayerTimes />

        <View style={styles.menuSection}>
          <View style={styles.gridContainer}>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.gridCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
                  onPress={() => router.push(item.route)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                    <IconComponent color="#FFFFFF" size={32} />
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
    paddingBottom: spacing.xxl * 2,
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#047857',
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
    maxWidth: 420,
    marginTop: spacing.lg,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  gridCard: {
    width: '47%',
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    alignItems: 'center',
    minHeight: 170,
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
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
