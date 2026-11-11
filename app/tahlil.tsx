import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { AppShell } from '@/components/AppShell';
import { Navbar } from '@/components/Navbar';
import { ReadingSettingsModal } from '@/components/ReadingSettingsModal';
import { TasbihModal } from '@/components/TasbihModal';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';
import { tahlilData } from '@/constants/tahlilData';

const JUMP_CHIPS = [
  { key: 'hadhorot', label: 'Hadhorot' },
  { key: 'surah', label: 'Surat Pendek' },
  { key: 'baqarah', label: 'Al-Baqarah' },
  { key: 'tahlil', label: 'Tahlil 41x' },
  { key: 'tasbih', label: 'Tasbih' },
  { key: 'doa', label: 'Doa Tahlil' },
  { key: 'penutup', label: 'Penutup' },
];

export default function TahlilScreen() {
  const { theme, fontSize } = useTheme();
  const { width } = useWindowDimensions();
  const themeColors = colors[theme];
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionOffsets = useRef<Record<string, number>>({});
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tasbihOpen, setTasbihOpen] = useState(false);

  const horizontalPad = width < 480 ? spacing.md : spacing.lg;
  const arabicLineHeight = Math.round(fontSize * 1.85);

  const handleJump = (key: string) => {
    const y = sectionOffsets.current[key];
    if (typeof y === 'number') {
      scrollViewRef.current?.scrollTo({ y: Math.max(0, y - 12), animated: true });
    }
  };

  return (
    <AppShell maxWidth={680}>
      <Navbar
        title="Tahlil & Doa"
        showBack
        showTasbih
        onOpenTasbih={() => setTasbihOpen(true)}
        showReadingSettings
        onOpenReadingSettings={() => setSettingsOpen(true)}
      />

      <View
        style={[
          styles.jumpBarWrapper,
          { backgroundColor: themeColors.background, borderBottomColor: themeColors.border },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.jumpBarContent}
        >
          {JUMP_CHIPS.map((chip) => (
            <TouchableOpacity
              key={chip.key}
              onPress={() => handleJump(chip.key)}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel={`Lompat ke bagian ${chip.label}`}
              style={[
                styles.jumpChip,
                {
                  backgroundColor: themeColors.surface,
                  borderColor: themeColors.border,
                },
              ]}
            >
              <Text style={[styles.jumpChipText, { color: themeColors.primary }]}>
                {chip.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        ref={scrollViewRef}
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
          Majelis Tahlil Pondok Pesantren An-Nidhomiyyah
        </Text>

        {tahlilData.map((item) => (
          <View
            key={item.id}
            style={[
              styles.section,
              item.isColophon && [
                styles.colophonCard,
                {
                  backgroundColor: themeColors.calloutBg,
                  borderColor: themeColors.calloutBorder,
                },
              ],
            ]}
            onLayout={
              item.sectionKey
                ? (e) => {
                    sectionOffsets.current[item.sectionKey!] = e.nativeEvent.layout.y;
                  }
                : undefined
            }
          >
            {item.sectionLabel && (
              <View
                style={[
                  styles.sectionLabelBadge,
                  {
                    backgroundColor: themeColors.badgeNeutralBg,
                    borderColor: themeColors.badgeNeutralBorder,
                  },
                ]}
              >
                <Text style={[styles.sectionLabelText, { color: themeColors.badgeNeutralText }]}>
                  {item.sectionLabel}
                </Text>
              </View>
            )}

            <Text
              style={[
                item.isColophon ? styles.colophonText : styles.arabicText,
                {
                  color: item.isColophon ? themeColors.calloutText : themeColors.text,
                  fontSize: item.isColophon ? Math.max(16, fontSize - 4) : fontSize,
                  lineHeight: item.isColophon
                    ? Math.round(Math.max(16, fontSize - 4) * 1.7)
                    : arabicLineHeight,
                },
              ]}
            >
              {item.arabic}
            </Text>
          </View>
        ))}

        <Footer />
      </ScrollView>

      <ReadingSettingsModal
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        showTranslationOption={false}
      />

      <TasbihModal
        visible={tasbihOpen}
        label="Tahlil Utama (41x)"
        target={41}
        onClose={() => setTasbihOpen(false)}
      />
    </AppShell>
  );
}

const styles = StyleSheet.create({
  jumpBarWrapper: {
    borderBottomWidth: 1,
    paddingVertical: spacing.xs + 2,
  },
  jumpBarContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs + 2,
  },
  jumpChip: {
    minHeight: 36,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jumpChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
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
    marginBottom: spacing.lg,
  },
  sectionLabelBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.xs,
  },
  sectionLabelText: {
    fontSize: 12,
    fontWeight: '700',
    writingDirection: 'ltr',
  },
  arabicText: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: spacing.xs,
  },
  colophonCard: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
  },
  colophonText: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});
