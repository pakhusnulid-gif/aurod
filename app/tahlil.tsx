import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Navbar } from '@/components/Navbar';
import { FontSizeSlider } from '@/components/FontSizeSlider';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';
import { tahlilData } from '@/constants/tahlilData';

export default function TahlilScreen() {
  const { theme, fontSize } = useTheme();
  const themeColors = colors[theme];
  const arabicLineHeight = Math.round(fontSize * 1.85);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Navbar title="Tahlil" showBack />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContent}>
          <Text
            style={[
              styles.mainTitle,
              {
                color: themeColors.primary,
                fontSize: fontSize + 6,
                lineHeight: Math.round((fontSize + 6) * 1.5),
              },
            ]}
          >
            مَجْلِسُ التَّهْلِيْلِ
          </Text>

          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Majelis Tahlil
          </Text>

          {tahlilData.map((item) => (
            <View key={item.id} style={styles.section}>
              <Text style={[styles.arabicText, { color: themeColors.text, fontSize, lineHeight: arabicLineHeight }]}>
                {item.arabic}
              </Text>

              {item.repeat && (
                <Text style={[styles.repeatText, { color: themeColors.textSecondary }]}>
                  ({item.repeat}x)
                </Text>
              )}
            </View>
          ))}

          <View
            style={[
              styles.closingSection,
              {
                backgroundColor: themeColors.calloutBg,
                borderColor: themeColors.calloutBorder,
              },
            ]}
          >
            <Text
              style={[
                styles.closingText,
                {
                  color: themeColors.primary,
                  fontSize: fontSize + 2,
                  lineHeight: Math.round((fontSize + 2) * 1.6),
                },
              ]}
            >
              الْفَاتِحَة
            </Text>
            <Text style={[styles.closingSubtext, { color: themeColors.calloutText }]}>
              Ditutup dengan membaca Al-Fatihah
            </Text>
          </View>

          <Footer />
        </View>
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
  innerContent: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
  },
  mainTitle: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  arabicText: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'right',
    marginTop: spacing.sm,
  },
  repeatText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  closingSection: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  closingText: {
    fontFamily: 'Amiri-Bold',
    marginBottom: spacing.xs,
  },
  closingSubtext: {
    fontSize: 13,
    fontWeight: '500',
  },
});
