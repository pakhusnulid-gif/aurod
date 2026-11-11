import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight, Clock } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';
import {
  calculatePrayerTimes,
  PrayerTimesResult,
  getNextPrayer,
} from '@/utils/prayerTimes';
import { getCurrentLocation } from '@/utils/locationService';

interface PrayerTime {
  name: string;
  time: string;
  isNext: boolean;
}

interface PrayerTimesProps {
  onOpenDetail?: () => void;
}

function buildPrayerList(times: PrayerTimesResult): PrayerTime[] {
  const nextPrayer = getNextPrayer(times);

  return [
    { name: 'Subuh', time: times.fajr, isNext: nextPrayer.name === 'Subuh' },
    { name: 'Dzuhur', time: times.dhuhr, isNext: nextPrayer.name === 'Dzuhur' },
    { name: 'Ashar', time: times.asr, isNext: nextPrayer.name === 'Ashar' },
    { name: 'Maghrib', time: times.maghrib, isNext: nextPrayer.name === 'Maghrib' },
    { name: 'Isya', time: times.isha, isNext: nextPrayer.name === 'Isya' },
  ];
}

export function PrayerTimes({ onOpenDetail }: PrayerTimesProps) {
  const { theme } = useTheme();
  const themeColors = colors[theme];
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>(() =>
    buildPrayerList(calculatePrayerTimes())
  );

  useEffect(() => {
    let isMounted = true;
    let activeCoords = { latitude: -6.8976, longitude: 112.0478 };

    const refreshPrayerTimes = () => {
      const times = calculatePrayerTimes(activeCoords.latitude, activeCoords.longitude, new Date());
      if (isMounted) {
        setPrayerTimes(buildPrayerList(times));
      }
    };

    getCurrentLocation()
      .then((locationData) => {
        activeCoords = {
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        };
        refreshPrayerTimes();
      })
      .catch((error) => {
        console.error('Error loading prayer times:', error);
      });

    const intervalId = setInterval(refreshPrayerTimes, 60000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View
      style={[
        styles.cardWrapper,
        {
          backgroundColor: themeColors.card,
          borderColor: themeColors.border,
          shadowColor: themeColors.shadow,
        },
      ]}
    >
      <View style={styles.gridContainer}>
        {prayerTimes.map((prayer) => (
          <View
            key={prayer.name}
            style={[
              styles.prayerCell,
              prayer.isNext && {
                backgroundColor: themeColors.calloutBg,
                borderColor: themeColors.calloutBorder,
              },
            ]}
          >
            <Text
              numberOfLines={1}
              maxFontSizeMultiplier={1.2}
              style={[
                styles.prayerName,
                { color: prayer.isNext ? themeColors.primary : themeColors.textSecondary },
              ]}
            >
              {prayer.name}
            </Text>
            <Text
              numberOfLines={1}
              maxFontSizeMultiplier={1.2}
              style={[
                styles.prayerTime,
                { color: prayer.isNext ? themeColors.primary : themeColors.text },
              ]}
            >
              {prayer.time}
            </Text>
          </View>
        ))}
      </View>

      {onOpenDetail && (
        <TouchableOpacity
          onPress={onOpenDetail}
          activeOpacity={0.75}
          style={[styles.detailAction, { borderTopColor: themeColors.border }]}
          accessibilityRole="button"
          accessibilityLabel="Lihat detail 8 waktu salat lengkap termasuk Imsak dan Dhuha"
        >
          <View style={styles.detailLeft}>
            <Clock color={themeColors.primary} size={14} />
            <Text style={[styles.detailText, { color: themeColors.primary }]}>
              Jadwal lengkap (Imsak, Terbit, Dhuha)
            </Text>
          </View>
          <ChevronRight color={themeColors.primary} size={16} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  gridContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.xs,
    gap: 2,
  },
  prayerCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: 2,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  prayerName: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 1,
  },
  prayerTime: {
    fontSize: 12.5,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  detailAction: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderTopWidth: 1,
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
