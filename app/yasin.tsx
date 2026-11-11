import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Repeat, Info, ArrowDown, ChevronRight, ChevronLeft } from 'lucide-react-native';
import { Navbar } from '@/components/Navbar';
import { FontSizeSlider } from '@/components/FontSizeSlider';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';
import { yasinFadhilahData, YasinContent, YasinAyat, YasinSisipan, YasinAyatParsial } from '@/constants/yasinData';

export default function YasinScreen() {
  const { theme, fontSize } = useTheme();
  const themeColors = colors[theme];

  const arabicFontSize = fontSize + 4;
  const arabicLineHeight = Math.round(arabicFontSize * 1.85);
  const translationFontSize = Math.max(14, fontSize - 4);
  const translationLineHeight = Math.round(translationFontSize * 1.55);
  const badgeFontSize = Math.min(Math.max(fontSize - 8, 13), 16);
  const badgeLineHeight = Math.round(badgeFontSize * 1.4);
  const ayatBadgeSize = Math.max(32, Math.min(40, badgeFontSize + 18));

  const renderAyat = (item: YasinAyat) => {
    return (
      <View key={item.id} style={styles.ayatContainer}>
        <View style={styles.ayatHeader}>
          <View
            style={[
              styles.ayatNumber,
              {
                backgroundColor: themeColors.primary,
                minWidth: ayatBadgeSize,
                height: ayatBadgeSize,
                borderRadius: borderRadius.full,
              },
            ]}
          >
            <Text style={[styles.ayatNumberText, { color: themeColors.onPrimary, fontSize: badgeFontSize }]}>
              {item.nomor_ayat}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.arabicText,
            { color: themeColors.text, fontSize: arabicFontSize, lineHeight: arabicLineHeight },
          ]}
        >
          {item.arabic}
        </Text>

        {item.repeat && (
          <View
            style={[
              styles.badgeRow,
              {
                backgroundColor: themeColors.badgeSuccessBg,
                borderColor: themeColors.badgeSuccessBorder,
              },
            ]}
          >
            <Repeat color={themeColors.badgeSuccessText} size={15} />
            <Text
              style={[
                styles.badgeText,
                { color: themeColors.badgeSuccessText, fontSize: badgeFontSize, lineHeight: badgeLineHeight },
              ]}
            >
              {item.repeat}
            </Text>
          </View>
        )}

        {item.instruction && (
          <View
            style={[
              styles.badgeRow,
              {
                backgroundColor: themeColors.badgeWarningBg,
                borderColor: themeColors.badgeWarningBorder,
              },
            ]}
          >
            <Info color={themeColors.badgeWarningText} size={15} />
            <Text
              style={[
                styles.badgeText,
                { color: themeColors.badgeWarningText, fontSize: badgeFontSize, lineHeight: badgeLineHeight },
              ]}
            >
              {item.instruction}
            </Text>
          </View>
        )}

        {item.wirid_instruction && (
          <View style={styles.wiridSection}>
            <View
              style={[
                styles.badgeRow,
                {
                  backgroundColor: themeColors.badgeInfoBg,
                  borderColor: themeColors.badgeInfoBorder,
                  marginBottom: spacing.sm,
                },
              ]}
            >
              <Repeat color={themeColors.badgeInfoText} size={15} />
              <Text
                style={[
                  styles.badgeText,
                  { color: themeColors.badgeInfoText, fontSize: badgeFontSize, lineHeight: badgeLineHeight },
                ]}
              >
                {item.wirid_instruction}
              </Text>
            </View>
            {item.wirid_arabic && (
              <Text
                style={[
                  styles.wiridArabic,
                  {
                    color: themeColors.text,
                    fontSize,
                    lineHeight: Math.round(fontSize * 1.75),
                  },
                ]}
              >
                {item.wirid_arabic}
              </Text>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderSisipan = (item: YasinSisipan) => {
    const arabicParts = item.arabic.split('\n\n');
    const hasSeparateTranslations =
      Boolean(item.doa_translation && item.sholawat_translation) && arabicParts.length >= 2;
    const sisipanArabicSize = fontSize + 2;
    const sisipanArabicLineHeight = Math.round(sisipanArabicSize * 1.85);

    return (
      <View
        key={item.id}
        style={[
          styles.sisipanContainer,
          {
            backgroundColor: themeColors.calloutBg,
            borderColor: themeColors.calloutBorder,
          },
        ]}
      >
        <View style={styles.sisipanHeader}>
          <View style={styles.sisipanPosRow}>
            <ArrowDown color={themeColors.calloutText} size={14} />
            <Text style={[styles.sisipanPosition, { color: themeColors.calloutText, fontSize: badgeFontSize }]}>
              {item.position}
            </Text>
          </View>
          <Text
            style={[
              styles.sisipanTitle,
              { color: themeColors.primary, fontSize: Math.max(16, fontSize - 2) },
            ]}
          >
            {item.title}
          </Text>
          <View
            style={[
              styles.sisipanRepeatPill,
              { backgroundColor: themeColors.primary, borderColor: themeColors.primary },
            ]}
          >
            <Text style={[styles.sisipanRepeatText, { color: themeColors.onPrimary, fontSize: badgeFontSize }]}>
              {item.repeat}
            </Text>
          </View>
        </View>

        {hasSeparateTranslations ? (
          <>
            <Text
              style={[
                styles.sisipanArabic,
                { color: themeColors.text, fontSize: sisipanArabicSize, lineHeight: sisipanArabicLineHeight },
              ]}
            >
              {arabicParts[0]}
            </Text>
            <Text
              style={[
                styles.sisipanTranslation,
                {
                  color: themeColors.calloutText,
                  fontSize: translationFontSize,
                  lineHeight: translationLineHeight,
                  marginBottom: spacing.md,
                },
              ]}
            >
              {item.doa_translation}
            </Text>

            <Text
              style={[
                styles.sisipanArabic,
                { color: themeColors.text, fontSize: sisipanArabicSize, lineHeight: sisipanArabicLineHeight },
              ]}
            >
              {arabicParts[1]}
            </Text>
            <Text
              style={[
                styles.sisipanTranslation,
                {
                  color: themeColors.calloutText,
                  fontSize: translationFontSize,
                  lineHeight: translationLineHeight,
                },
              ]}
            >
              {item.sholawat_translation}
            </Text>
          </>
        ) : (
          <>
            <Text
              style={[
                styles.sisipanArabic,
                { color: themeColors.text, fontSize: sisipanArabicSize, lineHeight: sisipanArabicLineHeight },
              ]}
            >
              {item.arabic}
            </Text>
            <Text
              style={[
                styles.sisipanTranslation,
                {
                  color: themeColors.calloutText,
                  fontSize: translationFontSize,
                  lineHeight: translationLineHeight,
                },
              ]}
            >
              {item.translation}
            </Text>
          </>
        )}
      </View>
    );
  };

  const renderAyatParsial = (item: YasinAyatParsial) => {
    const isAwal = item.bagian === 'awal';
    return (
      <View key={item.id} style={styles.ayatParsialContainer}>
        <View style={styles.ayatHeader}>
          <View
            style={[
              styles.ayatNumber,
              {
                backgroundColor: themeColors.primary,
                minWidth: ayatBadgeSize,
                height: ayatBadgeSize,
                borderRadius: borderRadius.full,
              },
            ]}
          >
            <Text style={[styles.ayatNumberText, { color: themeColors.onPrimary, fontSize: badgeFontSize }]}>
              {item.nomor_ayat}
            </Text>
          </View>
          <View
            style={[
              styles.parsialBadge,
              {
                backgroundColor: themeColors.badgeNeutralBg,
                borderColor: themeColors.badgeNeutralBorder,
              },
            ]}
          >
            {isAwal ? (
              <ChevronRight color={themeColors.badgeNeutralText} size={14} />
            ) : (
              <ChevronLeft color={themeColors.badgeNeutralText} size={14} />
            )}
            <Text
              style={[
                styles.parsialText,
                { color: themeColors.badgeNeutralText, fontSize: Math.max(12, badgeFontSize - 1) },
              ]}
            >
              {isAwal ? 'Awal Ayat' : 'Lanjutan Ayat'}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.arabicText,
            { color: themeColors.text, fontSize: arabicFontSize, lineHeight: arabicLineHeight },
          ]}
        >
          {item.arabic}
        </Text>

        {item.translation && (
          <Text
            style={[
              styles.translationText,
              {
                color: themeColors.textSecondary,
                fontSize: translationFontSize,
                lineHeight: translationLineHeight,
              },
            ]}
          >
            {item.translation}
          </Text>
        )}
      </View>
    );
  };

  const renderContent = (item: YasinContent) => {
    switch (item.type) {
      case 'ayat':
        return renderAyat(item);
      case 'sisipan':
        return renderSisipan(item);
      case 'ayat_parsial':
        return renderAyatParsial(item);
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
        <View style={styles.innerContent}>
          <Text
            style={[
              styles.mainTitle,
              {
                color: themeColors.primary,
                fontSize: fontSize + 8,
                lineHeight: Math.round((fontSize + 8) * 1.5),
              },
            ]}
          >
            يس
          </Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary, fontSize: Math.max(14, fontSize - 2) }]}>
            Surat Yasin dengan Fadhilah
          </Text>

          <Text
            style={[
              styles.basmalah,
              {
                color: themeColors.text,
                fontSize: fontSize + 6,
                lineHeight: Math.round((fontSize + 6) * 1.7),
              },
            ]}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </Text>

          {yasinFadhilahData.map((item) => renderContent(item))}

          <View style={[styles.divider, { backgroundColor: themeColors.border }]} />

          <Text
            style={[
              styles.closingText,
              {
                color: themeColors.primary,
                fontSize: fontSize + 4,
                lineHeight: Math.round((fontSize + 4) * 1.6),
              },
            ]}
          >
            صَدَقَ اللهُ الْعَظِيْمُ
          </Text>

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
    marginBottom: spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  basmalah: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    marginBottom: spacing.xl,
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
    paddingHorizontal: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ayatNumberText: {
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
    userSelect: 'none',
  },
  arabicText: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'right',
    marginBottom: spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginTop: spacing.sm,
  },
  badgeText: {
    flexShrink: 1,
    fontWeight: '600',
    textAlign: 'center',
  },
  wiridSection: {
    marginTop: spacing.sm,
  },
  wiridArabic: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'center',
  },
  sisipanContainer: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginVertical: spacing.lg,
  },
  sisipanHeader: {
    marginBottom: spacing.md,
  },
  sisipanPosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  sisipanPosition: {
    fontWeight: '600',
  },
  sisipanTitle: {
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  sisipanRepeatPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  sisipanRepeatText: {
    fontWeight: '700',
  },
  sisipanArabic: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'right',
    marginBottom: spacing.sm,
  },
  sisipanTranslation: {
    fontStyle: 'italic',
    textAlign: 'left',
  },
  ayatParsialContainer: {
    marginBottom: spacing.lg,
  },
  parsialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  parsialText: {
    fontWeight: '600',
  },
  translationText: {
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
  divider: {
    height: 1,
    marginVertical: spacing.xl,
  },
  closingText: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
});
