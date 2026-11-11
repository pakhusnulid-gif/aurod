import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import Svg, { Path, Polygon, Line, Circle, Rect } from 'react-native-svg';
import { AppShell } from '@/components/AppShell';
import { Navbar } from '@/components/Navbar';
import { ReadingSettingsModal } from '@/components/ReadingSettingsModal';
import { TasbihModal } from '@/components/TasbihModal';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';

const SHOLAWAT_FATIH_LINES = [
  'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ',
  'الْفَاتِحِ لِمَا أُغْلِقَ وَالْخَاتِمِ',
  'لِمَا سَبَقَ نَاصِرِ الْحَقِّ بِالْحَقِّ',
  'وَالْهَادِي إِلَى صِرَاطِكَ',
  'الْمُسْتَقِيمِ وَعَلَى آلِهِ',
  'حَقَّ قَدْرِهِ وَمِقْدَارِهِ الْعَظِيمِ',
];

const SHOLAWAT_FATIH_TRANSLATION =
  'Ya Allah, limpahkanlah rahmat takzim kepada junjungan kami Nabi Muhammad, sang pembuka perkara yang tertutup, penutup para nabi yang terdahulu, pembela kebenaran dengan kebenaran, dan pemberi petunjuk ke jalan-Mu yang lurus. Semoga rahmat-Mu juga tercurah kepada keluarganya sesuai hak derajat dan kedudukannya yang agung.';

export default function SholawatFatihScreen() {
  const { theme, fontSize, showTranslation } = useTheme();
  const { width } = useWindowDimensions();
  const themeColors = colors[theme];
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tasbihOpen, setTasbihOpen] = useState(false);

  const isCompact = width < 480;
  const horizontalPad = isCompact ? spacing.md : spacing.lg;
  const frameWidth = Math.min(width - horizontalPad * 2, 500);
  const crownWidth = Math.round(frameWidth * 0.72);
  const crownHeight = Math.max(108, Math.min(168, Math.round(crownWidth * 0.48)));

  const arabicSize = Math.max(20, Math.min(fontSize + 2, 34));
  const arabicLineHeight = Math.round(arabicSize * 2.05);

  const isDark = theme === 'dark';
  const paperBg = isDark ? themeColors.card : '#FFFDF7';
  const borderColor = isDark ? '#D4AF37' : '#1E293B';
  const innerBorderColor = isDark ? 'rgba(212, 175, 55, 0.55)' : 'rgba(30, 41, 59, 0.65)';
  const inkColor = isDark ? '#F8FAFC' : '#0F172A';
  const headingInkColor = isDark ? '#FDE68A' : '#065F46';

  return (
    <AppShell maxWidth={680}>
      <Navbar
        title="Sholawat Fatih"
        showBack
        showTasbih
        onOpenTasbih={() => setTasbihOpen(true)}
        showReadingSettings
        onOpenReadingSettings={() => setSettingsOpen(true)}
      />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPad }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Classic Kitab Lauh / Ornamental Frame */}
        <View style={styles.lauhContainer}>
          {/* Crown Triangle (Taj) */}
          <View
            style={[
              styles.crownWrapper,
              {
                width: crownWidth,
                height: crownHeight,
              },
            ]}
          >
            <Svg
              width="100%"
              height="100%"
              viewBox="0 0 300 140"
              preserveAspectRatio="none"
              style={StyleSheet.absoluteFill}
            >
              <Polygon
                points="150,4 6,138 294,138"
                fill={paperBg}
                stroke={borderColor}
                strokeWidth="2.5"
                strokeLinejoin="miter"
              />
              <Polygon
                points="150,12 18,133 282,133"
                fill="none"
                stroke={innerBorderColor}
                strokeWidth="1"
              />
              <Line
                x1="82.8"
                y1="66"
                x2="217.2"
                y2="66"
                stroke={borderColor}
                strokeWidth="2"
              />
              <Line
                x1="78.5"
                y1="70"
                x2="221.5"
                y2="70"
                stroke={innerBorderColor}
                strokeWidth="1"
              />
              <Circle cx="150" cy="4" r="2.5" fill={borderColor} />
            </Svg>

            <View
              style={[
                styles.crownApexBox,
                { top: Math.round(crownHeight * 0.14) },
              ]}
            >
              <Text
                style={[
                  styles.allahText,
                  {
                    color: inkColor,
                    fontSize: Math.max(19, Math.round(crownHeight * 0.19)),
                    lineHeight: Math.round(Math.max(19, Math.round(crownHeight * 0.19)) * 1.4),
                  },
                ]}
              >
                اللَّهُ
              </Text>
            </View>

            <View
              style={[
                styles.crownBandBox,
                {
                  top: Math.round(crownHeight * 0.54),
                  paddingHorizontal: Math.round(crownWidth * 0.14),
                },
              ]}
            >
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
                style={[
                  styles.headingArabic,
                  {
                    color: headingInkColor,
                    fontSize: Math.max(18, Math.round(crownHeight * 0.2)),
                    lineHeight: Math.round(Math.max(18, Math.round(crownHeight * 0.2)) * 1.5),
                  },
                ]}
              >
                الصَّلَوَاتُ الْفَاتِحُ
              </Text>
            </View>
          </View>

          {/* Main Double-Bordered Frame */}
          <View
            style={[
              styles.outerFrame,
              {
                width: frameWidth,
                backgroundColor: paperBg,
                borderColor,
              },
            ]}
          >
            {/* Classical corner knots */}
            <View style={[styles.cornerKnot, styles.cornerTL, { borderColor, backgroundColor: paperBg }]} />
            <View style={[styles.cornerKnot, styles.cornerTR, { borderColor, backgroundColor: paperBg }]} />
            <View style={[styles.cornerKnot, styles.cornerBL, { borderColor, backgroundColor: paperBg }]} />
            <View style={[styles.cornerKnot, styles.cornerBR, { borderColor, backgroundColor: paperBg }]} />

            <View
              style={[
                styles.innerFrame,
                {
                  borderColor: innerBorderColor,
                  paddingHorizontal: isCompact ? spacing.md : spacing.xl,
                  paddingVertical: isCompact ? spacing.lg : spacing.xl,
                },
              ]}
            >
              {SHOLAWAT_FATIH_LINES.map((line, index) => (
                <Text
                  key={index}
                  style={[
                    styles.sholawatLine,
                    {
                      color: inkColor,
                      fontSize: arabicSize,
                      lineHeight: arabicLineHeight,
                    },
                  ]}
                >
                  {line}
                </Text>
              ))}

              {/* Subtle calligraphic ending stroke like manuscript page */}
              <View style={styles.endFlourishWrap}>
                <Svg width={54} height={14} viewBox="0 0 60 16" fill="none">
                  <Path
                    d="M6 10 C16 2, 26 14, 34 8 C42 3, 49 12, 55 6"
                    stroke={innerBorderColor}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </Svg>
              </View>
            </View>
          </View>

          {/* Bottom ornamental tailpiece bar */}
          <View style={styles.tailpieceWrap}>
            <Svg
              width={Math.min(frameWidth * 0.86, 360)}
              height={18}
              viewBox="0 0 320 20"
              fill="none"
            >
              <Path
                d="M12 10 L118 7 L160 4 L202 7 L308 10 L202 13 L160 16 L118 13 Z"
                fill={borderColor}
              />
              <Rect
                x="156"
                y="6"
                width="8"
                height="8"
                transform="rotate(45 160 10)"
                fill={paperBg}
                stroke={borderColor}
                strokeWidth="1.5"
              />
            </Svg>
          </View>
        </View>

        {showTranslation && (
          <View
            style={[
              styles.translationCard,
              {
                backgroundColor: themeColors.calloutBg,
                borderColor: themeColors.calloutBorder,
              },
            ]}
          >
            <Text style={[styles.translationLabel, { color: themeColors.primary }]}>
              Artinya
            </Text>
            <Text
              style={[
                styles.translationBody,
                {
                  color: themeColors.calloutText,
                  fontSize: Math.max(14, fontSize - 6),
                  lineHeight: Math.round(Math.max(14, fontSize - 6) * 1.6),
                },
              ]}
            >
              {SHOLAWAT_FATIH_TRANSLATION}
            </Text>
          </View>
        )}

        <Footer />
      </ScrollView>

      <ReadingSettingsModal
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        showTranslationOption
      />

      <TasbihModal
        visible={tasbihOpen}
        label="Wirid Sholawat Fatih"
        target={100}
        onClose={() => setTasbihOpen(false)}
      />
    </AppShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  lauhContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.lg,
  },
  crownWrapper: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: -2,
    zIndex: 2,
  },
  crownApexBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  allahText: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  crownBandBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  headingArabic: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  outerFrame: {
    position: 'relative',
    borderWidth: 2,
    padding: 5,
  },
  innerFrame: {
    borderWidth: 1,
    alignItems: 'center',
    gap: 2,
  },
  cornerKnot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderWidth: 1.5,
    zIndex: 3,
  },
  cornerTL: {
    top: -4,
    left: -4,
  },
  cornerTR: {
    top: -4,
    right: -4,
  },
  cornerBL: {
    bottom: -4,
    left: -4,
  },
  cornerBR: {
    bottom: -4,
    right: -4,
  },
  sholawatLine: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  endFlourishWrap: {
    marginTop: spacing.xs,
    alignItems: 'center',
  },
  tailpieceWrap: {
    marginTop: spacing.sm + 2,
    alignItems: 'center',
  },
  translationCard: {
    width: '100%',
    maxWidth: 500,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  translationLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: spacing.xs,
    writingDirection: 'ltr',
  },
  translationBody: {
    fontStyle: 'italic',
    writingDirection: 'ltr',
  },
});

