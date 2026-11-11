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
import { tawassulData } from '@/constants/tawassulData';
import { parseRepeatTarget } from '@/utils/repeatTarget';

export default function TawassulScreen() {
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
        title="Tawassul"
        showBack
        showReadingSettings
        onOpenReadingSettings={() => setSettingsOpen(true)}
      />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPad }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.arabicText, { color: themeColors.text, fontSize, lineHeight: arabicLineHeight }]}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </Text>

        {tawassulData.map((item) => {
          const target = parseRepeatTarget(item.title);
          return (
            <View key={item.id} style={styles.itemContainer}>
              <Text style={[styles.arabicText, { color: themeColors.text, fontSize, lineHeight: arabicLineHeight }]}>
                {item.text}
              </Text>
              {target && (
                <TouchableOpacity
                  onPress={() => setTasbihState({ label: item.title, target })}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityLabel={`Buka tasbih penghitung ${target} kali untuk ${item.title}`}
                  style={[
                    styles.tasbihChip,
                    {
                      backgroundColor: themeColors.badgeSuccessBg,
                      borderColor: themeColors.badgeSuccessBorder,
                    },
                  ]}
                >
                  <Repeat color={themeColors.badgeSuccessText} size={14} />
                  <Text style={[styles.tasbihChipText, { color: themeColors.badgeSuccessText }]}>
                    Tasbih {target}x
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}

        <View style={[styles.divider, { backgroundColor: themeColors.border }]} />

        <Text style={[styles.arabicText, { color: themeColors.text, fontSize, lineHeight: arabicLineHeight }]}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </Text>

        <Text style={[styles.arabicText, { color: themeColors.text, fontSize, lineHeight: arabicLineHeight }]}>
          اَلْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِيْنَ. الرَّحْمٰنِ الرَّحِيْمِ. مَالِكِ يَوْمِ الدِّيْنِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِيْنُ. اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَ. صِرَاطَ الَّذِيْنَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّآلِّيْنَ
        </Text>

        <Text style={[styles.arabicText, { color: themeColors.text, fontSize, lineHeight: arabicLineHeight }]}>
          اٰمِيْن يَا رَبَّ الْعَالَمِيْنَ
        </Text>

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
  arabicText: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: spacing.sm,
  },
  itemContainer: {
    marginBottom: spacing.lg,
  },
  tasbihChip: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minHeight: 36,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    marginTop: spacing.xs,
  },
  tasbihChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: spacing.xl,
  },
});
