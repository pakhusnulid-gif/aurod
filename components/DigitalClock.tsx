import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Calendar, MapPin } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing } from '@/constants/theme';
import { gregorianToHijri, formatHijriDate } from '@/utils/hijriDate';
import { getFullDayName } from '@/utils/pasaranJawa';
import { getCurrentLocation } from '@/utils/locationService';

const INDONESIAN_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

export function DigitalClock() {
  const { theme } = useTheme();
  const themeColors = colors[theme];
  const [time, setTime] = useState(() => new Date());
  const [city, setCity] = useState<string>(Platform.OS === 'web' ? 'Tuban' : 'Memuat lokasi...');

  useEffect(() => {
    let isMounted = true;

    const timer = setInterval(() => {
      const now = new Date();
      setTime((prev) => {
        if (
          prev.getHours() === now.getHours() &&
          prev.getMinutes() === now.getMinutes() &&
          prev.getDate() === now.getDate()
        ) {
          return prev;
        }
        return now;
      });
    }, 1000);

    getCurrentLocation()
      .then((locationData) => {
        if (isMounted && locationData.city) {
          setCity(locationData.city);
        }
      })
      .catch((error) => {
        console.error('Error loading location:', error);
        if (isMounted) setCity('Tuban');
      });

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    const dayName = getFullDayName(date);
    const day = date.getDate();
    const month = INDONESIAN_MONTHS[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${month} ${year}`;
  };

  const hijriDateString = formatHijriDate(gregorianToHijri(time));

  return (
    <View style={styles.container}>
      <Text style={[styles.timeText, { color: themeColors.text }]}>
        {formatTime(time)}
      </Text>
      <View style={styles.dateContainer}>
        <Calendar color={themeColors.text} size={14} />
        <Text style={[styles.dateText, { color: themeColors.text }]}>
          {formatDate(time)}
        </Text>
      </View>
      <View style={styles.hijriContainer}>
        <Text style={[styles.hijriText, { color: themeColors.textSecondary }]}>
          {hijriDateString}
        </Text>
      </View>
      <View style={styles.locationContainer}>
        <MapPin color={themeColors.textSecondary} size={12} />
        <Text style={[styles.locationText, { color: themeColors.textSecondary }]}>
          {city}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  timeText: {
    fontSize: 56,
    fontWeight: '700',
    letterSpacing: 1,
    fontVariant: ['tabular-nums'],
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.xs,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
  },
  hijriContainer: {
    marginTop: 4,
  },
  hijriText: {
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '400',
  },
});
