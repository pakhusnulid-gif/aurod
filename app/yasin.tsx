import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { MoreVertical, Repeat, Info, ArrowDown, ChevronRight, ChevronLeft, Check } from 'lucide-react-native';
import { AppShell } from '@/components/AppShell';
import { Navbar } from '@/components/Navbar';
import { ReadingSettingsModal } from '@/components/ReadingSettingsModal';
import { TasbihModal } from '@/components/TasbihModal';
import { AyahMarker } from '@/components/AyahMarker';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';
import { getArabicFontFamily } from '@/constants/arabicFonts';
import {
  yasinFadhilahData,
  YasinContent,
  YasinAyat,
  YasinSisipan,
  YasinAyatParsial,
} from '@/constants/yasinData';
import { parseRepeatTarget } from '@/utils/repeatTarget';

const JUMP_CHIPS = [
  { key: '1', label: 'Ayat 1' },
  { key: 'sisipan_1', label: 'Sisipan 1' },
  { key: '38', label: 'Ayat 38' },
  { key: 'sisipan_3', label: 'Sisipan 3' },
  { key: '58', label: 'Ayat 58' },
  { key: 'sisipan_4', label: 'Sisipan 4' },
  { key: '81', label: 'Ayat 81' },
];

export default function YasinScreen() {
  const { theme, fontSize, arabicFont, showTranslation } = useTheme();
  const arabicFontRegular = getArabicFontFamily(arabicFont, 'regular');
  const arabicFontBold = getArabicFontFamily(arabicFont, 'bold');
  const { width } = useWindowDimensions();
  const themeColors = colors[theme];
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionOffsets = useRef<Record<string, number>>({});
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tasbihState, setTasbihState] = useState<{ label: string; target: number } | null>(null);
  const [copiedAyat, setCopiedAyat] = useState<number | null>(null);

  const isCompact = width < 480;
  const horizontalPad = isCompact ? spacing.md : spacing.lg;
  const sisipanPad = isCompact ? spacing.md : spacing.lg;

  const arabicFontSize = fontSize + 4;
  const arabicLineHeight = Math.round(arabicFontSize * 1.85);
  const translationFontSize = Math.max(14, fontSize - 4);
  const translationLineHeight = Math.round(translationFontSize * 1.55);
  const badgeFontSize = Math.min(Math.max(fontSize - 8, 13), 16);
  const badgeLineHeight = Math.round(badgeFontSize * 1.4);

  const handleJump = (key: string) => {
    const y = sectionOffsets.current[key];
    if (typeof y === 'number') {
      scrollViewRef.current?.scrollTo({ y: Math.max(0, y - 12), animated: true });
    }
  };

  const openTasbih = (label: string, text?: string) => {
    const target = parseRepeatTarget(text);
    if (target) {
      setTasbihState({ label, target });
    }
  };

  const handleAyatAction = (item: YasinAyat | YasinAyatParsial) => {
    const repeatTarget = parseRepeatTarget(
      ('repeat' in item && item.repeat) ||
      ('instruction' in item && item.instruction) ||
      ('wirid_instruction' in item && item.wirid_instruction) ||
      undefined
    );
    if (repeatTarget) {
      openTasbih(
        `Ayat ${item.nomor_ayat}`,
        ('repeat' in item && item.repeat) ||
        ('instruction' in item && item.instruction) ||
        ('wirid_instruction' in item && item.wirid_instruction) ||
        undefined
      );
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(item.arabic)
        .then(() => {
          setCopiedAyat(Number(item.nomor_ayat));
          setTimeout(() => setCopiedAyat(null), 1600);
        })
        .catch(() => {});
    }
  };

  const renderAyat = (item: YasinAyat) => {
    const repeatTarget = parseRepeatTarget(item.repeat);
    const instructionTarget = parseRepeatTarget(item.instruction);
    const wiridTarget = parseRepeatTarget(item.wirid_instruction);
    const isCopied = copiedAyat === item.nomor_ayat;
    const markerSize = Math.max(26, Math.min(32, Math.round(arabicFontSize * 0.95)));
    const markerColor = theme === 'dark' ? '#C5A880' : '#A27B36';

    return (
      <View
        key={item.id}
        style={[
          styles.ayatContainer,
          {
            borderBottomColor:
              theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
          },
        ]}
        onLayout={(e) => {
          sectionOffsets.current[String(item.id)] = e.nativeEvent.layout.y;
        }}
      >
        <View style={styles.ayatMainRow}>
          {/* Action button on far left, matching NU Online */}
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.6}
            onPress={() => handleAyatAction(item)}
            accessibilityRole="button"
            accessibilityLabel={`Pilihan Ayat ${item.nomor_ayat}`}
          >
            {isCopied ? (
              <Check size={16} color={themeColors.badgeSuccessText} />
            ) : (
              <MoreVertical size={18} color={themeColors.textSecondary} />
            )}
          </TouchableOpacity>

          {/* Arabic text flowing RTL with inline AyahMarker at the end */}
          <View style={styles.arabicContentWrapper}>
            <Text
              style={[
                styles.arabicText,
                {
                  color: themeColors.text,
                  fontFamily: arabicFontRegular,
                  fontSize: arabicFontSize,
                  lineHeight: arabicLineHeight,
                },
              ]}
            >
              {item.arabic}
              {'  '}
              <AyahMarker
                number={item.nomor_ayat}
                size={markerSize}
                color={markerColor}
                textColor={themeColors.text}
              />
            </Text>
          </View>
        </View>

        {item.repeat && (
          <TouchableOpacity
            activeOpacity={repeatTarget ? 0.75 : 1}
            disabled={!repeatTarget}
            onPress={() => openTasbih(`Ayat ${item.nomor_ayat} (${item.repeat})`, item.repeat)}
            accessibilityRole={repeatTarget ? 'button' : 'text'}
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
              {repeatTarget ? ' (Ketuk Tasbih)' : ''}
            </Text>
          </TouchableOpacity>
        )}

        {item.instruction && (
          <TouchableOpacity
            activeOpacity={instructionTarget ? 0.75 : 1}
            disabled={!instructionTarget}
            onPress={() => openTasbih(`Ayat ${item.nomor_ayat} (${item.instruction})`, item.instruction)}
            accessibilityRole={instructionTarget ? 'button' : 'text'}
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
              {instructionTarget ? ' (Ketuk Tasbih)' : ''}
            </Text>
          </TouchableOpacity>
        )}

        {item.wirid_instruction && (
          <View style={styles.wiridSection}>
            <TouchableOpacity
              activeOpacity={wiridTarget ? 0.75 : 1}
              disabled={!wiridTarget}
              onPress={() =>
                openTasbih(`Wirid Ayat ${item.nomor_ayat}`, item.wirid_instruction)
              }
              accessibilityRole={wiridTarget ? 'button' : 'text'}
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
                {wiridTarget ? ' (Ketuk Tasbih)' : ''}
              </Text>
            </TouchableOpacity>
            {item.wirid_arabic && (
              <Text
                style={[
                  styles.wiridArabic,
                  {
                    color: themeColors.text,
                    fontFamily: arabicFontRegular,
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
    const repeatTarget = parseRepeatTarget(item.repeat);

    return (
      <View
        key={item.id}
        onLayout={(e) => {
          sectionOffsets.current[String(item.id)] = e.nativeEvent.layout.y;
        }}
        style={[
          styles.sisipanContainer,
          {
            padding: sisipanPad,
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
          <TouchableOpacity
            activeOpacity={repeatTarget ? 0.78 : 1}
            disabled={!repeatTarget}
            onPress={() => openTasbih(item.title, item.repeat)}
            accessibilityRole={repeatTarget ? 'button' : 'text'}
            style={[
              styles.sisipanRepeatPill,
              { backgroundColor: themeColors.primary, borderColor: themeColors.primary },
            ]}
          >
            <Text style={[styles.sisipanRepeatText, { color: themeColors.onPrimary, fontSize: badgeFontSize }]}>
              {item.repeat}
              {repeatTarget ? ' · Tasbih' : ''}
            </Text>
          </TouchableOpacity>
        </View>

        {hasSeparateTranslations ? (
          <>
            <Text
              style={[
                styles.sisipanArabic,
                {
                  color: themeColors.text,
                  fontFamily: arabicFontRegular,
                  fontSize: sisipanArabicSize,
                  lineHeight: sisipanArabicLineHeight,
                },
              ]}
            >
              {arabicParts[0]}
            </Text>
            {showTranslation && (
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
            )}

            <Text
              style={[
                styles.sisipanArabic,
                {
                  color: themeColors.text,
                  fontFamily: arabicFontRegular,
                  fontSize: sisipanArabicSize,
                  lineHeight: sisipanArabicLineHeight,
                },
              ]}
            >
              {arabicParts[1]}
            </Text>
            {showTranslation && (
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
            )}
          </>
        ) : (
          <>
            <Text
              style={[
                styles.sisipanArabic,
                {
                  color: themeColors.text,
                  fontFamily: arabicFontRegular,
                  fontSize: sisipanArabicSize,
                  lineHeight: sisipanArabicLineHeight,
                },
              ]}
            >
              {item.arabic}
            </Text>
            {showTranslation && (
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
            )}
          </>
        )}

        {item.guidance && (
          <View
            style={[
              styles.guidanceBox,
              {
                backgroundColor: themeColors.badgeWarningBg,
                borderColor: themeColors.badgeWarningBorder,
              },
            ]}
          >
            <Info color={themeColors.badgeWarningText} size={15} />
            <Text
              style={[
                styles.guidanceText,
                {
                  color: themeColors.badgeWarningText,
                  fontSize: badgeFontSize,
                  lineHeight: badgeLineHeight,
                },
              ]}
            >
              {item.guidance}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderAyatParsial = (item: YasinAyatParsial) => {
    const isAwal = item.bagian === 'awal';
    const markerSize = Math.max(26, Math.min(32, Math.round(arabicFontSize * 0.95)));
    const markerColor = theme === 'dark' ? '#C5A880' : '#A27B36';
    const isCopied = copiedAyat === item.nomor_ayat;

    return (
      <View
        key={item.id}
        style={[
          styles.ayatParsialContainer,
          {
            borderBottomColor:
              theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
          },
        ]}
        onLayout={(e) => {
          sectionOffsets.current[String(item.id)] = e.nativeEvent.layout.y;
        }}
      >
        <View style={styles.ayatMainRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.6}
            onPress={() => handleAyatAction(item as any)}
            accessibilityRole="button"
            accessibilityLabel={`Pilihan Ayat ${item.nomor_ayat}`}
          >
            {isCopied ? (
              <Check size={16} color={themeColors.badgeSuccessText} />
            ) : (
              <MoreVertical size={18} color={themeColors.textSecondary} />
            )}
          </TouchableOpacity>

          <View style={styles.arabicContentWrapper}>
            <View style={styles.parsialHeaderRow}>
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
                  <ChevronRight color={themeColors.badgeNeutralText} size={13} />
                ) : (
                  <ChevronLeft color={themeColors.badgeNeutralText} size={13} />
                )}
                <Text
                  style={[
                    styles.parsialText,
                    { color: themeColors.badgeNeutralText, fontSize: Math.max(12, badgeFontSize - 1) },
                  ]}
                >
                  {item.label ?? (isAwal ? `Awal Ayat ${item.nomor_ayat}` : `Lanjutan Ayat ${item.nomor_ayat}`)}
                </Text>
              </View>
            </View>

            <Text
              style={[
                styles.arabicText,
                {
                  color: themeColors.text,
                  fontFamily: arabicFontRegular,
                  fontSize: arabicFontSize,
                  lineHeight: arabicLineHeight,
                },
              ]}
            >
              {item.arabic}
              {!isAwal && (
                <>
                  {'  '}
                  <AyahMarker
                    number={item.nomor_ayat}
                    size={markerSize}
                    color={markerColor}
                    textColor={themeColors.text}
                  />
                </>
              )}
            </Text>
          </View>
        </View>

        {showTranslation && item.translation && (
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
    <AppShell maxWidth={680}>
      <Navbar
        title="Yasin Fadhilah Alfas Shohbi"
        showBack
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
              accessibilityLabel={`Lompat ke ${chip.label}`}
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
        <View
          style={[
            styles.introHeader,
            {
              backgroundColor: themeColors.surface,
              borderColor: themeColors.border,
              padding: sisipanPad,
            },
          ]}
        >
          <Text
            style={[
              styles.mainTitle,
              {
                color: themeColors.primary,
                fontFamily: arabicFontBold,
                fontSize: Math.min(fontSize + 6, 34),
                lineHeight: Math.round(Math.min(fontSize + 6, 34) * 1.65),
              },
            ]}
          >
            يٰس فَضِيْلَةُ أَلْفِ الصَّحْبِ
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: themeColors.text,
                fontSize: Math.max(15, Math.min(fontSize - 3, 20)),
              },
            ]}
          >
            Yasin Fadhilah Alfas Shohbi
          </Text>
          <View style={[styles.introDivider, { backgroundColor: themeColors.border }]} />
          <Text
            style={[
              styles.compilerArabic,
              {
                color: themeColors.textSecondary,
                fontFamily: arabicFontRegular,
                fontSize: Math.max(17, Math.min(fontSize - 2, 24)),
                lineHeight: Math.round(Math.max(17, Math.min(fontSize - 2, 24)) * 1.75),
              },
            ]}
          >
            لِلشَّيْخِ أَحْمَدَ مُشَفَّعْ بْنِ مَعْصُوْمٍ خَادِمِ مَعْهَدِ النِّظَامِيَّةِ طُوْبَان
          </Text>
        </View>

        <Text
          style={[
            styles.basmalah,
            {
              color: themeColors.text,
              fontFamily: arabicFontBold,
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
              fontFamily: arabicFontBold,
              fontSize: fontSize + 4,
              lineHeight: Math.round((fontSize + 4) * 1.6),
            },
          ]}
        >
          صَدَقَ اللهُ الْعَظِيْمُ
        </Text>

        <Footer />
      </ScrollView>

      <ReadingSettingsModal
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        showTranslationOption
      />

      <TasbihModal
        visible={Boolean(tasbihState)}
        label={tasbihState?.label ?? ''}
        target={tasbihState?.target ?? 7}
        onClose={() => setTasbihState(null)}
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
  introHeader: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  mainTitle: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontWeight: '700',
    textAlign: 'center',
    writingDirection: 'ltr',
  },
  introDivider: {
    width: '60%',
    height: StyleSheet.hairlineWidth,
    marginVertical: spacing.sm + 2,
  },
  compilerArabic: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  basmalah: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginBottom: spacing.lg,
  },
  ayatContainer: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  ayatMainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  actionBtn: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.full,
    marginTop: 4,
    opacity: 0.75,
  },
  arabicContentWrapper: {
    flex: 1,
  },
  ayatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.xs,
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
    writingDirection: 'rtl',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    minHeight: 34,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginTop: spacing.xs + 2,
    alignSelf: 'flex-end',
  },
  badgeText: {
    flexShrink: 1,
    fontWeight: '600',
    textAlign: 'center',
    writingDirection: 'ltr',
  },
  wiridSection: {
    marginTop: spacing.xs + 2,
  },
  wiridArabic: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  sisipanContainer: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginVertical: spacing.md,
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
    writingDirection: 'ltr',
  },
  sisipanTitle: {
    fontWeight: '700',
    writingDirection: 'ltr',
    marginBottom: spacing.sm,
  },
  sisipanRepeatPill: {
    alignSelf: 'flex-start',
    minHeight: 36,
    justifyContent: 'center',
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
    writingDirection: 'rtl',
    marginBottom: spacing.sm,
  },
  sisipanTranslation: {
    fontStyle: 'italic',
    textAlign: 'left',
    writingDirection: 'ltr',
  },
  guidanceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 2,
    marginTop: spacing.md,
    alignSelf: 'flex-start',
  },
  guidanceText: {
    flexShrink: 1,
    fontWeight: '600',
    writingDirection: 'ltr',
  },
  ayatParsialContainer: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  parsialHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: spacing.xs,
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
    writingDirection: 'ltr',
  },
  translationText: {
    fontStyle: 'italic',
    writingDirection: 'ltr',
    marginTop: spacing.xs,
  },
  divider: {
    height: 1,
    marginVertical: spacing.md,
  },
  closingText: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginBottom: spacing.md,
  },
});
