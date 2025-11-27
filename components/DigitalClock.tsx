import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, MapPin } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing } from '@/constants/theme';
import { gregorianToHijri, formatHijriDate } from '@/utils/hijriDate';
import { getFullDayName } from '@/utils/pasaranJawa';
import { getCurrentLocation, LocationData } from '@/utils/locationService';

export function DigitalClock() {
  const { theme } = useTheme();
  const themeColors = colors[theme];
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    loadLocation();

    return () => clearInterval(timer);
  }, []);

  const loadLocation = async () => {
    try {
      const locationData = await getCurrentLocation();
      setLocation(locationData);
    } catch (error) {
      console.error('Error loading location:', error);
    }
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const dayName = getFullDayName(date);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${month} ${year}`;
  };

  const getHijriDateString = (date: Date) => {
    const hijri = gregorianToHijri(date);
    return formatHijriDate(hijri);
  };

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
          {getHijriDateString(time)}
        </Text>
      </View>
      <View style={styles.locationContainer}>
        <MapPin color={themeColors.textSecondary} size={12} />
        <Text style={[styles.locationText, { color: themeColors.textSecondary }]}>
          {location ? location.city : 'Loading...'}
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
