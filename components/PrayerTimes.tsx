import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';
import { calculatePrayerTimes, PrayerTimesResult, getNextPrayer } from '@/utils/prayerTimes';
import { getCurrentLocation } from '@/utils/locationService';

interface PrayerTime {
  name: string;
  time: string;
  isNext: boolean;
}

function buildPrayerList(times: PrayerTimesResult): PrayerTime[] {
  const nextPrayer = getNextPrayer(times);

  return [
    { name: 'SUBUH', time: times.fajr, isNext: nextPrayer.name === 'Subuh' },
    { name: 'DZUHUR', time: times.dhuhr, isNext: nextPrayer.name === 'Dzuhur' },
    { name: 'ASHAR', time: times.asr, isNext: nextPrayer.name === 'Ashar' },
    { name: 'MAGHRIB', time: times.maghrib, isNext: nextPrayer.name === 'Maghrib' },
    { name: 'ISYA', time: times.isha, isNext: nextPrayer.name === 'Isya' },
  ];
}

export function PrayerTimes() {
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
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {prayerTimes.map((prayer) => (
          <View
            key={prayer.name}
            style={[
              styles.prayerCard,
              prayer.isNext && {
                backgroundColor: themeColors.calloutBg,
                borderColor: themeColors.calloutBorder,
                borderWidth: 1,
              },
            ]}
          >
            <Text
              style={[
                styles.prayerName,
                { color: prayer.isNext ? themeColors.primary : themeColors.textSecondary },
              ]}
            >
              {prayer.name}
            </Text>
            <Text
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 520,
    marginVertical: spacing.sm,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: spacing.xs,
  },
  prayerCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  prayerName: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  prayerTime: {
    fontSize: 13,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
});
