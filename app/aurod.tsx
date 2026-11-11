import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Repeat } from 'lucide-react-native';
import { AppShell } from '@/components/AppShell';
import { Navbar } from '@/components/Navbar';
import { ReadingSettingsModal } from '@/components/ReadingSettingsModal';
import { TasbihModal } from '@/components/TasbihModal';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';
import { getArabicFontFamily } from '@/constants/arabicFonts';
import { aurodData, AurodSection, AurodListItem } from '@/constants/aurodData';
import { parseRepeatTarget } from '@/utils/repeatTarget';

const SECTION_JUMP_CHIPS = [
  { id: 1, key: 'pembukaan', label: 'Pembukaan' },
  { id: 2, key: 'aurod1', label: 'Aurod I' },
  { id: 3, key: 'aurod2', label: 'Aurod II' },
  { id: 4, key: 'aurod3', label: 'Aurod III' },
  { id: 7, key: 'hailalah', label: 'Hailalah' },
  { id: 9, key: 'sanad', label: 'Sanad' },
];

const ID_TO_KEY: Record<number, string> = {
  1: 'pembukaan',
  2: 'aurod1',
  3: 'aurod2',
  4: 'aurod3',
  7: 'hailalah',
  9: 'sanad',
};

export default function AurodScreen() {
  const { section: targetSection } = useLocalSearchParams<{ section?: string }>();
  const { theme, fontSize, arabicFont, showTranslation, showLatin } = useTheme();
  const arabicFontRegular = getArabicFontFamily(arabicFont, 'regular');
  const arabicFontBold = getArabicFontFamily(arabicFont, 'bold');
  const { width } = useWindowDimensions();
  const themeColors = colors[theme];
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionOffsets = useRef<Record<string, number>>({});
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tasbihState, setTasbihState] = useState<{ label: string; target: number } | null>(null);

  const horizontalPad = width < 480 ? spacing.md : spacing.lg;
  const proseSize = Math.max(15, fontSize - 2);
  const proseLineHeight = Math.round(proseSize * 1.55);
  const meaningSize = Math.max(14, fontSize - 4);
  const meaningLineHeight = Math.round(meaningSize * 1.55);
  const arabicSectionSize = fontSize + 4;
  const arabicSectionLineHeight = Math.round(arabicSectionSize * 1.85);
  const listArabicSize = fontSize + 2;
  const listArabicLineHeight = Math.round(listArabicSize * 1.85);

  const scrollToKey = (key: string) => {
    const y = sectionOffsets.current[key];
    if (typeof y === 'number') {
      scrollViewRef.current?.scrollTo({ y: Math.max(0, y - 12), animated: true });
    }
  };

  useEffect(() => {
    if (!targetSection) return;
    const timer = setTimeout(() => {
      scrollToKey(targetSection);
    }, 250);
    return () => clearTimeout(timer);
  }, [targetSection]);

  const renderNotes = (notes: string | string[] | undefined) => {
    if (!notes) return null;

    const notesArray = Array.isArray(notes) ? notes : [notes];

    return (
      <View
        style={[
          styles.notesContainer,
          {
            backgroundColor: themeColors.calloutBg,
            borderColor: themeColors.calloutBorder,
          },
        ]}
      >
        {notesArray.map((note, index) => (
          <Text
            key={index}
            style={[
              styles.notesText,
              {
                color: themeColors.calloutText,
                fontSize: proseSize,
                lineHeight: proseLineHeight,
              },
            ]}
          >
            {note}
          </Text>
        ))}
      </View>
    );
  };

  const renderBody = (body: string[] | undefined) => {
    if (!body) return null;

    return (
      <View style={styles.bodyContainer}>
        {body.map((paragraph, index) => (
          <Text
            key={index}
            style={[
              styles.bodyText,
              {
                color: themeColors.text,
                fontSize: proseSize,
                lineHeight: proseLineHeight,
              },
            ]}
          >
            {paragraph}
          </Text>
        ))}
      </View>
    );
  };

  const renderArabicSection = (section: AurodSection) => {
    if (!section.arabic) return null;

    const notesJoined = Array.isArray(section.notes)
      ? section.notes.join(' ')
      : section.notes;
    const repeatTarget = parseRepeatTarget(notesJoined);

    return (
      <View style={styles.arabicSection}>
        <Text
          style={[
            styles.arabicText,
            {
              color: themeColors.text,
              fontFamily: arabicFontRegular,
              fontSize: arabicSectionSize,
              lineHeight: arabicSectionLineHeight,
            },
          ]}
        >
          {section.arabic}
        </Text>
        {showLatin && section.latin && (
          <Text
            style={[
              styles.latinText,
              {
                color: themeColors.textSecondary,
                fontSize: proseSize,
                lineHeight: proseLineHeight,
              },
            ]}
          >
            {section.latin}
          </Text>
        )}
        {showTranslation && section.meaning && (
          <Text
            style={[
              styles.meaningText,
              {
                color: themeColors.textSecondary,
                fontSize: meaningSize,
                lineHeight: meaningLineHeight,
              },
            ]}
          >
            {section.meaning}
          </Text>
        )}
        {repeatTarget && (
          <TouchableOpacity
            onPress={() => setTasbihState({ label: section.title, target: repeatTarget })}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel={`Buka penghitung tasbih ${repeatTarget} kali untuk ${section.title}`}
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
              Tasbih {repeatTarget}x
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderList = (section: AurodSection) => {
    const list = section.list;
    if (!list) return null;

    return (
      <View style={styles.listContainer}>
        {list.map((item, index) => {
          if (typeof item === 'string') {
            return (
              <Text
                key={index}
                style={[
                  styles.listItemText,
                  {
                    color: themeColors.text,
                    fontSize: proseSize,
                    lineHeight: proseLineHeight,
                  },
                ]}
              >
                {item}
              </Text>
            );
          }

          const listItem: AurodListItem = item;
          const repeatTarget = parseRepeatTarget(listItem.latin);

          return (
            <View key={index} style={styles.listItem}>
              {listItem.number !== undefined && (
                <Text
                  style={[
                    styles.listNumber,
                    {
                      color: themeColors.primary,
                      fontSize: proseSize,
                      lineHeight: proseLineHeight,
                      minWidth: Math.max(24, proseSize + 6),
                    },
                  ]}
                >
                  {listItem.number}.
                </Text>
              )}
              <View style={styles.listContent}>
                {listItem.arabic && (
                  <Text
                    style={[
                      styles.arabicText,
                      {
                        color: themeColors.text,
                        fontFamily: arabicFontRegular,
                        fontSize: listArabicSize,
                        lineHeight: listArabicLineHeight,
                      },
                    ]}
                  >
                    {listItem.arabic}
                  </Text>
                )}
                {listItem.latin && (
                  <Text
                    style={[
                      styles.latinText,
                      {
                        color: themeColors.textSecondary,
                        fontSize: proseSize,
                        lineHeight: proseLineHeight,
                      },
                    ]}
                  >
                    {listItem.latin}
                  </Text>
                )}
                {showTranslation && listItem.meaning && (
                  <Text
                    style={[
                      styles.meaningText,
                      {
                        color: themeColors.textSecondary,
                        fontSize: meaningSize,
                        lineHeight: meaningLineHeight,
                      },
                    ]}
                  >
                    {listItem.meaning}
                  </Text>
                )}
                {repeatTarget && (
                  <TouchableOpacity
                    onPress={() =>
                      setTasbihState({
                        label: listItem.latin || section.title,
                        target: repeatTarget,
                      })
                    }
                    activeOpacity={0.75}
                    accessibilityRole="button"
                    accessibilityLabel={`Buka penghitung tasbih ${repeatTarget} kali`}
                    style={[
                      styles.tasbihChip,
                      {
                        alignSelf: 'flex-start',
                        backgroundColor: themeColors.badgeSuccessBg,
                        borderColor: themeColors.badgeSuccessBorder,
                      },
                    ]}
                  >
                    <Repeat color={themeColors.badgeSuccessText} size={14} />
                    <Text style={[styles.tasbihChipText, { color: themeColors.badgeSuccessText }]}>
                      Tasbih {repeatTarget}x
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <AppShell maxWidth={680}>
      <Navbar
        title="Aurod An-Nidhomiyyah"
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
          {SECTION_JUMP_CHIPS.map((chip) => (
            <TouchableOpacity
              key={chip.key}
              onPress={() => scrollToKey(chip.key)}
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
              fontFamily: arabicFontBold,
              fontSize: fontSize + 8,
              lineHeight: Math.round((fontSize + 8) * 1.5),
            },
          ]}
        >
          أَوْرَادُ النِّظَامِيَّةِ
        </Text>
        <Text style={[styles.subtitle, { color: themeColors.textSecondary, fontSize: proseSize }]}>
          Aurod An-Nidhomiyyah
        </Text>

        {aurodData.map((section, idx) => {
          const sectionKey = ID_TO_KEY[section.id];
          return (
            <View
              key={section.id}
              style={styles.section}
              onLayout={(e) => {
                if (sectionKey) {
                  sectionOffsets.current[sectionKey] = e.nativeEvent.layout.y;
                }
              }}
            >
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: themeColors.primary,
                    fontSize: fontSize + 2,
                    lineHeight: Math.round((fontSize + 2) * 1.4),
                  },
                ]}
              >
                {section.title}
              </Text>

              {renderNotes(section.notes)}
              {renderBody(section.body)}
              {renderArabicSection(section)}
              {renderList(section)}

              {idx < aurodData.length - 1 && (
                <View style={[styles.divider, { backgroundColor: themeColors.border }]} />
              )}
            </View>
          );
        })}

        <Footer />
      </ScrollView>

      <ReadingSettingsModal
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        showTranslationOption
        showLatinOption
      />

      <TasbihModal
        visible={Boolean(tasbihState)}
        label={tasbihState?.label ?? ''}
        target={tasbihState?.target ?? 100}
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
  mainTitle: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginBottom: spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
    writingDirection: 'ltr',
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontWeight: '700',
    textAlign: 'center',
    writingDirection: 'ltr',
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  notesContainer: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  notesText: {
    marginBottom: spacing.xs,
    writingDirection: 'ltr',
  },
  bodyContainer: {
    marginBottom: spacing.md,
  },
  bodyText: {
    marginBottom: spacing.sm,
    textAlign: 'left',
    writingDirection: 'ltr',
  },
  arabicSection: {
    marginBottom: spacing.md,
  },
  arabicText: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: spacing.sm,
  },
  latinText: {
    textAlign: 'left',
    writingDirection: 'ltr',
    marginBottom: spacing.sm,
    fontStyle: 'italic',
  },
  meaningText: {
    textAlign: 'left',
    writingDirection: 'ltr',
    fontStyle: 'italic',
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
    marginTop: spacing.xs + 2,
  },
  tasbihChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContainer: {
    marginBottom: spacing.md,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  listNumber: {
    fontWeight: '700',
    marginRight: spacing.sm,
    fontVariant: ['tabular-nums'],
  },
  listContent: {
    flex: 1,
  },
  listItemText: {
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
    writingDirection: 'ltr',
  },
  divider: {
    height: 1,
    marginVertical: spacing.lg,
  },
});
