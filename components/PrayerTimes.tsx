import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing } from '@/constants/theme';
import { calculatePrayerTimes, PrayerTimesResult, getNextPrayer } from '@/utils/prayerTimes';
import { getCurrentLocation, LocationData } from '@/utils/locationService';

interface PrayerTime {
  name: string;
  time: string;
  isNext: boolean;
}

export function PrayerTimes() {
  const { theme } = useTheme();
  const themeColors = colors[theme];
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [location, setLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    loadLocationAndPrayerTimes();
  }, []);

  const loadLocationAndPrayerTimes = async () => {
    try {
      const locationData = await getCurrentLocation();
      setLocation(locationData);

      const times = calculatePrayerTimes(
        locationData.latitude,
        locationData.longitude,
        new Date()
      );

      updatePrayerTimes(times);

      const interval = setInterval(() => {
        const updatedTimes = calculatePrayerTimes(
          locationData.latitude,
          locationData.longitude,
          new Date()
        );
        updatePrayerTimes(updatedTimes);
      }, 60000);

      return () => clearInterval(interval);
    } catch (error) {
      console.error('Error loading prayer times:', error);
    }
  };

  const updatePrayerTimes = (times: PrayerTimesResult) => {
    const nextPrayer = getNextPrayer(times);

    const prayers: PrayerTime[] = [
      { name: 'SUBUH', time: times.fajr, isNext: nextPrayer.name === 'Subuh' },
      { name: 'DZUHUR', time: times.dhuhr, isNext: nextPrayer.name === 'Dzuhur' },
      { name: 'ASHAR', time: times.asr, isNext: nextPrayer.name === 'Ashar' },
      { name: 'MAGHRIB', time: times.maghrib, isNext: nextPrayer.name === 'Maghrib' },
      { name: 'ISYA', time: times.isha, isNext: nextPrayer.name === 'Isya' },
    ];

    setPrayerTimes(prayers);
  };

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {prayerTimes.map((prayer, index) => (
          <View
            key={index}
            style={[
              styles.prayerCard,
              prayer.isNext && { backgroundColor: themeColors.primary + '15' },
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
    marginVertical: spacing.sm,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  prayerCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  prayerName: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  prayerTime: {
    fontSize: 12,
    fontWeight: '700',
  },
});
