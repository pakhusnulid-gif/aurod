import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Switch,
  StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Minus, Plus, X } from 'lucide-react-native';
import {
  useTheme,
  MIN_FONT_SIZE,
  MAX_FONT_SIZE,
} from '@/contexts/ThemeContext';
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
    showTranslation,
    setShowTranslation,
    showLatin,
    setShowLatin,
  } = useTheme();
  const insets = useSafeAreaInsets();
  const themeColors = colors[theme];

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
                  fontSize: fontSize + 2,
                  lineHeight: Math.round((fontSize + 2) * 1.7),
                },
              ]}
            >
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
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
    marginBottom: spacing.md,
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
    fontFamily: 'Amiri-Regular',
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

