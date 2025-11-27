import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Navbar } from '@/components/Navbar';
import { FontSizeSlider } from '@/components/FontSizeSlider';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing } from '@/constants/theme';
import { tahlilData } from '@/constants/tahlilData';

export default function TahlilScreen() {
  const { theme, fontSize } = useTheme();
  const themeColors = colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Navbar title="Tahlil" showBack />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.mainTitle, { color: themeColors.primary, fontSize: fontSize + 6 }]}>
          مَجْلِسُ التَّهْلِيْلِ
        </Text>

        <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
          Majelis Tahlil
        </Text>

        {tahlilData.map((item) => (
          <View key={item.id} style={styles.section}>
            <Text style={[styles.arabicText, { color: themeColors.text, fontSize }]}>
              {item.arabic}
            </Text>

            {item.repeat && (
              <Text style={[styles.repeatText, { color: themeColors.textSecondary }]}>
                ({item.repeat}x)
              </Text>
            )}
          </View>
        ))}

        <View style={[styles.closingSection, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.closingText, { color: themeColors.primary, fontSize: fontSize + 2 }]}>
            الْفَاتِحَة
          </Text>
          <Text style={[styles.closingSubtext, { color: themeColors.textSecondary }]}>
            Ditutup dengan membaca Al-Fatihah
          </Text>
        </View>

        <Footer />
      </ScrollView>

      <FontSizeSlider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: 120,
  },
  mainTitle: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    userSelect: 'none',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: spacing.xl,
    userSelect: 'none',
  },
  section: {
    marginBottom: spacing.xl,
  },
  arabicText: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'right',
    lineHeight: 48,
    marginTop: spacing.sm,
    userSelect: 'none',
  },
  repeatText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: spacing.sm,
    userSelect: 'none',
  },
  closingSection: {
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  closingText: {
    fontFamily: 'Amiri-Bold',
    marginBottom: spacing.xs,
    userSelect: 'none',
  },
  closingSubtext: {
    fontSize: 12,
    userSelect: 'none',
  },
});
