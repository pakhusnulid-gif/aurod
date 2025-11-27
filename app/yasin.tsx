import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Navbar } from '@/components/Navbar';
import { FontSizeSlider } from '@/components/FontSizeSlider';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';
import { yasinFadhilahData, YasinContent, YasinAyat, YasinSisipan, YasinAyatParsial } from '@/constants/yasinData';

export default function YasinScreen() {
  const { theme, fontSize } = useTheme();
  const themeColors = colors[theme];

  const renderAyat = (item: YasinAyat) => {
    return (
      <View key={item.id} style={styles.ayatContainer}>
        <View style={styles.ayatHeader}>
          <View style={[styles.ayatNumber, { backgroundColor: themeColors.primary }]}>
            <Text style={[styles.ayatNumberText, { fontSize: fontSize - 6 }]}>{item.nomor_ayat}</Text>
          </View>
        </View>

        <Text style={[styles.arabicText, { color: themeColors.text, fontSize: fontSize + 4 }]}>
          {item.arabic}
        </Text>

        {item.instruction && (
          <View style={[styles.instructionBadge, { backgroundColor: '#fef3c7', borderColor: '#f59e0b' }]}>
            <Text style={[styles.instructionText, { color: '#92400e', fontSize: fontSize - 6 }]}>
              📌 {item.instruction}
            </Text>
          </View>
        )}

        {item.wirid_instruction && (
          <View style={styles.wiridSection}>
            <View style={[styles.wiridBadge, { backgroundColor: '#dbeafe', borderColor: '#3b82f6' }]}>
              <Text style={[styles.wiridInstructionText, { color: '#1e40af', fontSize: fontSize - 6 }]}>
                🔁 {item.wirid_instruction}
              </Text>
            </View>
            {item.wirid_arabic && (
              <Text style={[styles.wiridArabic, { color: themeColors.text, fontSize: fontSize }]}>
                {item.wirid_arabic}
              </Text>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderSisipan = (item: YasinSisipan) => {
    return (
      <View key={item.id} style={[styles.sisipanContainer, { backgroundColor: '#d1fae5', borderColor: '#10b981' }]}>
        <View style={styles.sisipanHeader}>
          <Text style={[styles.sisipanPosition, { color: '#065f46', fontSize: fontSize - 6 }]}>
            ⬇️ {item.position}
          </Text>
          <Text style={[styles.sisipanTitle, { color: '#047857', fontSize: fontSize - 2 }]}>
            {item.title}
          </Text>
          <View style={[styles.repeatBadge, { backgroundColor: '#047857' }]}>
            <Text style={[styles.repeatText, { fontSize: fontSize - 6 }]}>
              {item.repeat}
            </Text>
          </View>
        </View>

        <Text style={[styles.sisipanArabic, { color: '#065f46', fontSize: fontSize + 2 }]}>
          {item.arabic}
        </Text>

        <Text style={[styles.sisipanTranslation, { color: '#065f46', fontSize: fontSize - 4 }]}>
          {item.translation}
        </Text>
      </View>
    );
  };

  const renderAyatParsial = (item: YasinAyatParsial) => {
    return (
      <View key={item.id} style={styles.ayatParsialContainer}>
        <View style={styles.ayatHeader}>
          <View style={[styles.ayatNumber, { backgroundColor: themeColors.primary }]}>
            <Text style={[styles.ayatNumberText, { fontSize: fontSize - 6 }]}>
              {item.nomor_ayat}
            </Text>
          </View>
          <View style={[styles.parsialBadge, { backgroundColor: '#fce7f3', borderColor: '#ec4899' }]}>
            <Text style={[styles.parsialText, { color: '#9f1239', fontSize: fontSize - 8 }]}>
              {item.bagian === 'awal' ? '▶️ Awal Ayat' : '◀️ Lanjutan'}
            </Text>
          </View>
        </View>

        <Text style={[styles.arabicText, { color: themeColors.text, fontSize: fontSize + 4 }]}>
          {item.arabic}
        </Text>

        {item.translation && (
          <Text style={[styles.translationText, { color: themeColors.textSecondary, fontSize: fontSize - 4 }]}>
            {item.translation}
          </Text>
        )}
      </View>
    );
  };

  const renderContent = (item: YasinContent) => {
    switch (item.type) {
      case 'ayat':
        return renderAyat(item as YasinAyat);
      case 'sisipan':
        return renderSisipan(item as YasinSisipan);
      case 'ayat_parsial':
        return renderAyatParsial(item as YasinAyatParsial);
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Navbar title="Yasin Fadhilah" showBack />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.mainTitle, { color: themeColors.primary, fontSize: fontSize + 8 }]}>
          يس
        </Text>
        <Text style={[styles.subtitle, { color: themeColors.textSecondary, fontSize: fontSize - 2 }]}>
          Surat Yasin dengan Fadhilah
        </Text>

        <Text style={[styles.basmalah, { color: themeColors.text, fontSize: fontSize + 6 }]}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </Text>

        {yasinFadhilahData.map((item) => renderContent(item))}

        <View style={[styles.divider, { backgroundColor: themeColors.border }]} />

        <Text style={[styles.closingText, { color: themeColors.primary, fontSize: fontSize + 4 }]}>
          صَدَقَ اللهُ الْعَظِيْمُ
        </Text>

        <Text style={[styles.footer, { color: themeColors.textSecondary, fontSize: fontSize - 4 }]}>
          Pondok Pesantren An-Nidhomiyyah Tuban
        </Text>

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
    marginBottom: spacing.xs,
    userSelect: 'none',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing.lg,
    userSelect: 'none',
  },
  basmalah: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    marginBottom: spacing.xl,
    userSelect: 'none',
  },
  ayatContainer: {
    marginBottom: spacing.lg,
  },
  ayatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  ayatNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ayatNumberText: {
    color: '#FFFFFF',
    fontWeight: '700',
    userSelect: 'none',
  },
  arabicText: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'right',
    lineHeight: 44,
    marginBottom: spacing.sm,
    userSelect: 'none',
  },
  instructionBadge: {
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginTop: spacing.sm,
  },
  instructionText: {
    fontWeight: '600',
    textAlign: 'center',
    userSelect: 'none',
  },
  wiridSection: {
    marginTop: spacing.sm,
  },
  wiridBadge: {
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  wiridInstructionText: {
    fontWeight: '600',
    textAlign: 'center',
    userSelect: 'none',
  },
  wiridArabic: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'center',
    lineHeight: 32,
    userSelect: 'none',
  },
  sisipanContainer: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    marginVertical: spacing.lg,
  },
  sisipanHeader: {
    marginBottom: spacing.md,
  },
  sisipanPosition: {
    fontWeight: '600',
    marginBottom: spacing.xs,
    userSelect: 'none',
  },
  sisipanTitle: {
    fontWeight: '700',
    marginBottom: spacing.sm,
    userSelect: 'none',
  },
  repeatBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginBottom: spacing.sm,
  },
  repeatText: {
    color: '#FFFFFF',
    fontWeight: '600',
    userSelect: 'none',
  },
  sisipanArabic: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'right',
    lineHeight: 40,
    marginBottom: spacing.md,
    userSelect: 'none',
  },
  sisipanTranslation: {
    fontStyle: 'italic',
    lineHeight: 22,
    textAlign: 'justify',
    userSelect: 'none',
  },
  ayatParsialContainer: {
    marginBottom: spacing.lg,
  },
  parsialBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
  },
  parsialText: {
    fontWeight: '600',
    userSelect: 'none',
  },
  translationText: {
    fontStyle: 'italic',
    lineHeight: 22,
    marginTop: spacing.sm,
    userSelect: 'none',
  },
  divider: {
    height: 1,
    marginVertical: spacing.xl,
  },
  closingText: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    marginBottom: spacing.md,
    userSelect: 'none',
  },
  footer: {
    textAlign: 'center',
    fontStyle: 'italic',
    userSelect: 'none',
  },
});
