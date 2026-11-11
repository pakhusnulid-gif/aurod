import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Repeat } from 'lucide-react-native';
import { AppShell } from '@/components/AppShell';
import { Navbar } from '@/components/Navbar';
import { ReadingSettingsModal } from '@/components/ReadingSettingsModal';
import { TasbihModal } from '@/components/TasbihModal';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';
import { tahlilData } from '@/constants/tahlilData';

export default function TahlilScreen() {
  const { theme, fontSize } = useTheme();
  const { width } = useWindowDimensions();
  const themeColors = colors[theme];
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tasbihState, setTasbihState] = useState<{ label: string; target: number } | null>(null);

  const horizontalPad = width < 480 ? spacing.md : spacing.lg;
  const arabicLineHeight = Math.round(fontSize * 1.85);

  return (
    <AppShell maxWidth={680}>
      <Navbar
        title="Tahlil"
        showBack
        showReadingSettings
        onOpenReadingSettings={() => setSettingsOpen(true)}
      />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPad }]}
        showsVerticalScrollIndicator={false}
      >
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
              <TouchableOpacity
                onPress={() =>
                  setTasbihState({
                    label: `Bacaan Tahlil (${item.repeat}x)`,
                    target: item.repeat!,
                  })
                }
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityLabel={`Buka penghitung tasbih ${item.repeat} kali`}
                style={[
                  styles.repeatPill,
                  {
                    backgroundColor: themeColors.badgeSuccessBg,
                    borderColor: themeColors.badgeSuccessBorder,
                  },
                ]}
              >
                <Repeat color={themeColors.badgeSuccessText} size={14} />
                <Text style={[styles.repeatText, { color: themeColors.badgeSuccessText }]}>
                  Dibaca {item.repeat}x (Ketuk untuk Tasbih)
                </Text>
              </TouchableOpacity>
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
      </ScrollView>

      <ReadingSettingsModal
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        showTranslationOption={false}
      />

      <TasbihModal
        visible={Boolean(tasbihState)}
        label={tasbihState?.label ?? ''}
        target={tasbihState?.target ?? 10}
        onClose={() => setTasbihState(null)}
      />
    </AppShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  mainTitle: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    writingDirection: 'ltr',
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  arabicText: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: spacing.sm,
  },
  repeatPill: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minHeight: 40,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    marginTop: spacing.sm,
  },
  repeatText: {
    fontSize: 13,
    fontWeight: '600',
  },
  closingSection: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  closingText: {
    fontFamily: 'Amiri-Bold',
    writingDirection: 'rtl',
    marginBottom: spacing.xs,
  },
  closingSubtext: {
    fontSize: 13,
    fontWeight: '500',
    writingDirection: 'ltr',
  },
});
