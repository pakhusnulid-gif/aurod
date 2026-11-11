import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Switch,
  StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Check, Minus, Plus, X } from 'lucide-react-native';
import {
  useTheme,
  MIN_FONT_SIZE,
  MAX_FONT_SIZE,
} from '@/contexts/ThemeContext';
import {
  ARABIC_FONT_OPTIONS,
  getArabicFontFamily,
} from '@/constants/arabicFonts';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface ReadingSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  showTranslationOption?: boolean;
  showLatinOption?: boolean;
}

export function ReadingSettingsModal({
  visible,
  onClose,
  showTranslationOption = true,
  showLatinOption = false,
}: ReadingSettingsModalProps) {
  const {
    theme,
    fontSize,
    setFontSize,
    arabicFont,
    setArabicFont,
    showTranslation,
    setShowTranslation,
    showLatin,
    setShowLatin,
  } = useTheme();
  const insets = useSafeAreaInsets();
  const themeColors = colors[theme];
  const previewFontFamily = getArabicFontFamily(arabicFont, 'regular');
  const previewText =
    arabicFont === 'lpmq'
      ? 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ'
      : 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={[
            styles.sheet,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.border,
              paddingBottom: Math.max(insets.bottom, spacing.md) + spacing.sm,
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: themeColors.text }]}>
              Pengaturan Bacaan
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeBtn}
              accessibilityRole="button"
              accessibilityLabel="Tutup pengaturan bacaan"
            >
              <X color={themeColors.textSecondary} size={20} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                styles.previewBox,
                {
                  backgroundColor: themeColors.surface,
                  borderColor: themeColors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.previewArabic,
                  {
                    color: themeColors.text,
                    fontFamily: previewFontFamily,
                    fontSize: fontSize + 2,
                    lineHeight: Math.round((fontSize + 2) * 1.75),
                  },
                ]}
              >
                {previewText}
              </Text>
            </View>

            <View style={styles.rowHeader}>
              <Text style={[styles.label, { color: themeColors.text }]}>
                Ukuran Huruf
              </Text>
              <Text style={[styles.valueText, { color: themeColors.primary }]}>
                {fontSize} px
              </Text>
            </View>

            <View style={styles.sliderRow}>
              <TouchableOpacity
                onPress={() => setFontSize(fontSize - 2)}
                disabled={fontSize <= MIN_FONT_SIZE}
                style={[
                  styles.stepBtn,
                  {
                    backgroundColor: themeColors.surface,
                    borderColor: themeColors.border,
                    opacity: fontSize <= MIN_FONT_SIZE ? 0.4 : 1,
                  },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Perkecil ukuran huruf"
              >
                <Minus color={themeColors.text} size={18} />
              </TouchableOpacity>

              <Slider
                style={styles.slider}
                minimumValue={MIN_FONT_SIZE}
                maximumValue={MAX_FONT_SIZE}
                step={1}
                value={fontSize}
                onValueChange={setFontSize}
                minimumTrackTintColor={themeColors.primary}
                maximumTrackTintColor={themeColors.border}
                thumbTintColor={themeColors.primary}
                accessibilityLabel="Atur ukuran huruf bacaan"
              />

              <TouchableOpacity
                onPress={() => setFontSize(fontSize + 2)}
                disabled={fontSize >= MAX_FONT_SIZE}
                style={[
                  styles.stepBtn,
                  {
                    backgroundColor: themeColors.surface,
                    borderColor: themeColors.border,
                    opacity: fontSize >= MAX_FONT_SIZE ? 0.4 : 1,
                  },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Perbesar ukuran huruf"
              >
                <Plus color={themeColors.text} size={18} />
              </TouchableOpacity>
            </View>

            <View style={styles.fontSection}>
              <Text style={[styles.label, { color: themeColors.text }]}>
                Jenis Font Arab
              </Text>
              <View style={styles.fontGrid}>
                {ARABIC_FONT_OPTIONS.map((option) => {
                  const selected = arabicFont === option.key;
                  const optionFamily = getArabicFontFamily(option.key, 'regular');
                  return (
                    <TouchableOpacity
                      key={option.key}
                      onPress={() => setArabicFont(option.key)}
                      activeOpacity={0.78}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      accessibilityLabel={`Pilih font Arab ${option.label}`}
                      style={[
                        styles.fontCard,
                        {
                          backgroundColor: selected ? themeColors.calloutBg : themeColors.surface,
                          borderColor: selected ? themeColors.primary : themeColors.border,
                        },
                      ]}
                    >
                      <View style={styles.fontCardHeader}>
                        <Text
                          style={[
                            styles.fontName,
                            { color: selected ? themeColors.primary : themeColors.text },
                          ]}
                          numberOfLines={1}
                        >
                          {option.label}
                        </Text>
                        {selected && <Check color={themeColors.primary} size={14} />}
                      </View>
                      <Text
                        style={[
                          styles.fontPreview,
                          {
                            color: themeColors.text,
                            fontFamily: optionFamily,
                          },
                        ]}
                        numberOfLines={1}
                      >
                        {option.previewSample}
                      </Text>
                      <Text
                        style={[styles.fontDesc, { color: themeColors.textSecondary }]}
                        numberOfLines={1}
                      >
                        {option.description}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {showLatinOption && (
              <View style={[styles.toggleRow, { borderTopColor: themeColors.border }]}>
                <View style={styles.toggleLabelWrap}>
                  <Text style={[styles.toggleLabel, { color: themeColors.text }]}>
                    Tampilkan Teks Latin
                  </Text>
                  <Text style={[styles.toggleHint, { color: themeColors.textSecondary }]}>
                    Transliterasi di bawah teks Arab
                  </Text>
                </View>
                <Switch
                  value={showLatin}
                  onValueChange={setShowLatin}
                  trackColor={{ false: themeColors.border, true: themeColors.primary }}
                  thumbColor="#F8FAF9"
                />
              </View>
            )}

            {showTranslationOption && (
              <View style={[styles.toggleRow, { borderTopColor: themeColors.border }]}>
                <View style={styles.toggleLabelWrap}>
                  <Text style={[styles.toggleLabel, { color: themeColors.text }]}>
                    Tampilkan Terjemahan / Arti
                  </Text>
                  <Text style={[styles.toggleHint, { color: themeColors.textSecondary }]}>
                    Arti Bahasa Indonesia di bawah doa
                  </Text>
                </View>
                <Switch
                  value={showTranslation}
                  onValueChange={setShowTranslation}
                  trackColor={{ false: themeColors.border, true: themeColors.primary }}
                  thumbColor="#F8FAF9"
                />
              </View>
            )}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 23, 0.55)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sheet: {
    width: '100%',
    maxWidth: 520,
    maxHeight: '88%',
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: spacing.md + 4,
    paddingTop: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm + 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  closeBtn: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewBox: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  previewArabic: {
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  valueText: {
    fontSize: 14,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  stepBtn: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    flex: 1,
    height: 40,
  },
  fontSection: {
    marginBottom: spacing.md,
    gap: spacing.xs + 2,
  },
  fontGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
  },
  fontCard: {
    width: '48.5%',
    minHeight: 82,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 4,
    borderRadius: borderRadius.md,
    borderWidth: 1.2,
    justifyContent: 'space-between',
  },
  fontCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  fontName: {
    fontSize: 12.5,
    fontWeight: '700',
    flexShrink: 1,
  },
  fontPreview: {
    fontSize: 17,
    lineHeight: 26,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginVertical: 2,
  },
  fontDesc: {
    fontSize: 10.5,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm + 4,
    borderTopWidth: 1,
    gap: spacing.md,
  },
  toggleLabelWrap: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  toggleHint: {
    fontSize: 12,
    marginTop: 2,
  },
});
