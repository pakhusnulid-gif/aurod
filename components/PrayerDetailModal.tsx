import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Moon,
  Sunrise,
  Sun,
  Sunset,
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';
import {
  calculatePrayerTimes,
  getNextPrayer,
  getNextPrayerCountdown,
  PrayerTimesResult,
} from '@/utils/prayerTimes';
import { gregorianToHijri, formatHijriDate } from '@/utils/hijriDate';

interface PrayerDetailModalProps {
  visible: boolean;
  onClose: () => void;
  latitude: number;
  longitude: number;
  city: string;
  region: string;
}

const INDONESIAN_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function PrayerDetailModal({
  visible,
  onClose,
  latitude,
  longitude,
  city,
  region,
}: PrayerDetailModalProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const themeColors = colors[theme];
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    if (!visible) return;
    setSelectedDate(new Date());
    setNow(new Date());

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [visible]);

  const times: PrayerTimesResult = calculatePrayerTimes(latitude, longitude, selectedDate);
  const todayTimes = calculatePrayerTimes(latitude, longitude, now);
  const countdown = getNextPrayerCountdown(todayTimes, now, latitude, longitude);
  const viewingToday = isSameDay(selectedDate, now);
  const nextPrayerToday = viewingToday ? getNextPrayer(times, now).name : '';

  const shiftDay = (delta: number) => {
    setSelectedDate((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + delta);
      return next;
    });
  };

  const resetToday = () => {
    setSelectedDate(new Date());
  };

  const formatGregorian = (date: Date) =>
    `${date.getDate()} ${INDONESIAN_MONTHS[date.getMonth()]} ${date.getFullYear()} M`;

  const hijriString = formatHijriDate(gregorianToHijri(selectedDate));

  const rows = [
    { key: 'Imsak', label: 'Imsak', time: times.imsak, icon: Moon },
    { key: 'Subuh', label: 'Subuh', time: times.fajr, icon: Moon },
    { key: 'Terbit', label: 'Terbit', time: times.sunrise, icon: Sunrise },
    { key: 'Dhuha', label: 'Dhuha', time: times.dhuha, icon: Sun },
    { key: 'Dzuhur', label: 'Dzuhur', time: times.dhuhr, icon: Sun },
    { key: 'Ashar', label: 'Ashar', time: times.asr, icon: Sun },
    { key: 'Maghrib', label: 'Maghrib', time: times.maghrib, icon: Sunset },
    { key: 'Isya', label: 'Isya', time: times.isha, icon: Moon },
  ];

  const sourceLabel =
    times.source === 'kemenag-tuban-2026'
      ? 'Jadwal Resmi Kemenag Kab. Tuban 2026'
      : 'Perhitungan Astronomis';

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.sheetContainer,
            {
              backgroundColor: themeColors.background,
              borderColor: themeColors.border,
              paddingBottom: Math.max(insets.bottom, spacing.md),
            },
          ]}
        >
          <View
            style={[
              styles.topBar,
              {
                backgroundColor: themeColors.surface,
                borderBottomColor: themeColors.border,
                paddingTop: Math.max(insets.top, spacing.sm) + spacing.xs,
              },
            ]}
          >
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Tutup jadwal salat"
            >
              <X color={themeColors.text} size={22} />
            </TouchableOpacity>
            <Text style={[styles.topTitle, { color: themeColors.text }]}>
              Jadwal Salat
            </Text>
            <View style={styles.closeButton} />
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <LinearGradient
              colors={[themeColors.heroGradientStart, themeColors.heroGradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroCard}
            >
              <View style={styles.locationRow}>
                <MapPin color={themeColors.heroSubtext} size={14} />
                <Text style={[styles.locationText, { color: themeColors.heroSubtext }]}>
                  {city}, {region}
                </Text>
              </View>

              <Text style={[styles.nextLabel, { color: themeColors.heroSubtext }]}>
                Waktu Salat Berikutnya
              </Text>
              <Text style={[styles.nextTime, { color: themeColors.heroText }]}>
                {countdown.name} {countdown.time} WIB
              </Text>
              <View
                style={[
                  styles.countdownPill,
                  {
                    backgroundColor: themeColors.heroPillBg,
                    borderColor: themeColors.heroPillBorder,
                  },
                ]}
              >
                <Text style={[styles.countdownText, { color: themeColors.heroText }]}>
                  {countdown.countdownText}
                </Text>
              </View>

              <Text style={[styles.sourceText, { color: themeColors.heroSubtext }]}>
                {sourceLabel}
              </Text>
            </LinearGradient>

            <View
              style={[
                styles.dateCard,
                {
                  backgroundColor: themeColors.card,
                  borderColor: themeColors.border,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => shiftDay(-1)}
                style={styles.dateArrowBtn}
                accessibilityRole="button"
                accessibilityLabel="Hari sebelumnya"
              >
                <ChevronLeft color={themeColors.text} size={20} />
              </TouchableOpacity>

              <View style={styles.dateCenter}>
                <Text style={[styles.dateGregorian, { color: themeColors.text }]}>
                  {formatGregorian(selectedDate)}
                </Text>
                <Text style={[styles.dateHijri, { color: themeColors.textSecondary }]}>
                  {hijriString}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => shiftDay(1)}
                style={styles.dateArrowBtn}
                accessibilityRole="button"
                accessibilityLabel="Hari berikutnya"
              >
                <ChevronRight color={themeColors.text} size={20} />
              </TouchableOpacity>
            </View>

            {!viewingToday && (
              <TouchableOpacity
                onPress={resetToday}
                style={[
                  styles.todayChip,
                  {
                    backgroundColor: themeColors.calloutBg,
                    borderColor: themeColors.calloutBorder,
                  },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Kembali ke tanggal hari ini"
              >
                <Text style={[styles.todayChipText, { color: themeColors.primary }]}>
                  Kembali ke Hari Ini
                </Text>
              </TouchableOpacity>
            )}

            <View style={styles.listCard}>
              {rows.map((row) => {
                const IconComp = row.icon;
                const isNext = viewingToday && nextPrayerToday === row.key;
                return (
                  <View
                    key={row.key}
                    style={[
                      styles.prayerRow,
                      {
                        backgroundColor: isNext
                          ? themeColors.calloutBg
                          : themeColors.card,
                        borderColor: isNext
                          ? themeColors.calloutBorder
                          : themeColors.border,
                      },
                    ]}
                  >
                    <View style={styles.rowLeft}>
                      <IconComp
                        color={isNext ? themeColors.primary : themeColors.textSecondary}
                        size={18}
                      />
                      <Text
                        style={[
                          styles.rowLabel,
                          {
                            color: isNext ? themeColors.primary : themeColors.text,
                            fontWeight: isNext ? '700' : '600',
                          },
                        ]}
                      >
                        {row.label}
                      </Text>
                      {isNext && (
                        <View
                          style={[
                            styles.nextBadge,
                            { backgroundColor: themeColors.primary },
                          ]}
                        >
                          <Text
                            style={[
                              styles.nextBadgeText,
                              { color: themeColors.onPrimary },
                            ]}
                          >
                            Berikutnya
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.rowTime,
                        {
                          color: isNext ? themeColors.primary : themeColors.text,
                        },
                      ]}
                    >
                      {row.time}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 23, 0.5)',
    alignItems: 'center',
  },
  sheetContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xs + 2,
    borderBottomWidth: 1,
    minHeight: 52,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontSize: 18,
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  heroCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: spacing.sm,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
  },
  nextLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  nextTime: {
    fontSize: 26,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
    marginBottom: spacing.sm,
  },
  countdownPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  countdownText: {
    fontSize: 15,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  sourceText: {
    fontSize: 11,
    fontWeight: '500',
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs + 2,
  },
  dateArrowBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCenter: {
    flex: 1,
    alignItems: 'center',
  },
  dateGregorian: {
    fontSize: 14,
    fontWeight: '700',
  },
  dateHijri: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 2,
  },
  todayChip: {
    alignSelf: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    minHeight: 36,
    justifyContent: 'center',
  },
  todayChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  listCard: {
    gap: spacing.xs + 2,
  },
  prayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    minHeight: 50,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rowLabel: {
    fontSize: 15,
  },
  nextBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  nextBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  rowTime: {
    fontSize: 15,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
});

