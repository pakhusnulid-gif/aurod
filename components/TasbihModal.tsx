import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RotateCcw, X, CheckCircle2 } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface TasbihModalProps {
  visible: boolean;
  label: string;
  target: number;
  onClose: () => void;
}

export function TasbihModal({ visible, label, target, onClose }: TasbihModalProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const themeColors = colors[theme];
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (visible) {
      setCount(0);
    }
  }, [visible, label, target]);

  const triggerHaptic = (completed: boolean) => {
    if (Platform.OS === 'web') return;
    if (completed) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
  };

  const handleTap = () => {
    setCount((prev) => {
      const next = prev + 1;
      triggerHaptic(next === target);
      return next;
    });
  };

  const handleReset = () => {
    setCount(0);
  };

  const safeTarget = Math.max(1, target);
  const progressPct = Math.min(100, (count / safeTarget) * 100);
  const isCompleted = count >= safeTarget;

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
            <View style={styles.headerTextWrap}>
              <Text style={[styles.eyebrow, { color: themeColors.primary }]}>
                Penghitung Dzikir
              </Text>
              <Text style={[styles.title, { color: themeColors.text }]} numberOfLines={2}>
                {label}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={styles.iconBtn}
              accessibilityRole="button"
              accessibilityLabel="Tutup penghitung dzikir"
            >
              <X color={themeColors.textSecondary} size={20} />
            </TouchableOpacity>
          </View>

          <View style={[styles.progressTrack, { backgroundColor: themeColors.border }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progressPct}%`,
                  backgroundColor: themeColors.primary,
                },
              ]}
            />
          </View>

          <TouchableOpacity
            onPress={handleTap}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={`Ketuk untuk menghitung dzikir, saat ini ${count} dari ${safeTarget}`}
            style={[
              styles.tapPad,
              {
                backgroundColor: isCompleted ? themeColors.calloutBg : themeColors.surface,
                borderColor: isCompleted ? themeColors.primary : themeColors.border,
              },
            ]}
          >
            <View style={styles.countRow}>
              <Text style={[styles.countNumber, { color: themeColors.primary }]}>
                {count}
              </Text>
              <Text style={[styles.targetNumber, { color: themeColors.textSecondary }]}>
                / {safeTarget}
              </Text>
            </View>
            {isCompleted ? (
              <View style={styles.doneRow}>
                <CheckCircle2 color={themeColors.primary} size={18} />
                <Text style={[styles.tapHint, { color: themeColors.primary }]}>
                  Target {safeTarget}x tercapai
                </Text>
              </View>
            ) : (
              <Text style={[styles.tapHint, { color: themeColors.textSecondary }]}>
                Ketuk area ini untuk menambah hitungan
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              onPress={handleReset}
              style={[
                styles.secondaryBtn,
                {
                  backgroundColor: themeColors.badgeNeutralBg,
                  borderColor: themeColors.badgeNeutralBorder,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Ulangi hitungan dari nol"
            >
              <RotateCcw color={themeColors.badgeNeutralText} size={16} />
              <Text style={[styles.secondaryBtnText, { color: themeColors.badgeNeutralText }]}>
                Ulangi
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
              style={[styles.primaryBtn, { backgroundColor: themeColors.primary }]}
              accessibilityRole="button"
              accessibilityLabel="Selesai menghitung"
            >
              <Text style={[styles.primaryBtnText, { color: themeColors.onPrimary }]}>
                Selesai
              </Text>
            </TouchableOpacity>
          </View>
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  headerTextWrap: {
    flex: 1,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  iconBtn: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTrack: {
    height: 6,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  tapPad: {
    minHeight: 168,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  countNumber: {
    fontSize: 52,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  targetNumber: {
    fontSize: 20,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  doneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tapHint: {
    fontSize: 13,
    fontWeight: '500',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  secondaryBtn: {
    flex: 1,
    minHeight: 46,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  secondaryBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  primaryBtn: {
    flex: 1,
    minHeight: 46,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
});

