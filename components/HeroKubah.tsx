import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Calendar, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';
import {
  calculatePrayerTimes,
  getNextPrayerCountdown,
} from '@/utils/prayerTimes';
import { gregorianToHijri, formatHijriDate } from '@/utils/hijriDate';
import { getFullDayName } from '@/utils/pasaranJawa';

const HERO_IMAGE = require('@/assets/images/pesantren-hero.jpg');

const INDONESIAN_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

interface HeroKubahProps {
  latitude: number;
  longitude: number;
  city: string;
  region: string;
  onPressSchedule: () => void;
}

export function HeroKubah({
  latitude,
  longitude,
  city,
  region,
  onPressSchedule,
}: HeroKubahProps) {
  const { theme } = useTheme();
  const themeColors = colors[theme];
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const prayerTimes = calculatePrayerTimes(latitude, longitude, now);
  const countdown = getNextPrayerCountdown(prayerTimes, now, latitude, longitude);

  const dayFull = getFullDayName(now);
  const dateText = `${dayFull}, ${now.getDate()} ${INDONESIAN_MONTHS[now.getMonth()]} ${now.getFullYear()}`;
  const hijriText = formatHijriDate(gregorianToHijri(now));

  return (
    <TouchableOpacity
      onPress={onPressSchedule}
      activeOpacity={0.92}
      accessibilityRole="button"
      accessibilityLabel={`Waktu salat berikutnya ${countdown.name} pukul ${countdown.time}, ketuk untuk melihat jadwal lengkap`}
      style={styles.wrapper}
    >
      <ImageBackground source={HERO_IMAGE} resizeMode="cover" style={styles.imageBg}>
        <LinearGradient
          colors={[themeColors.heroOverlay, themeColors.heroGradientStart]}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.overlay}
        >
          <View style={styles.topRow}>
            <View
              style={[
                styles.locationPill,
                {
                  backgroundColor: themeColors.heroPillBg,
                  borderColor: themeColors.heroPillBorder,
                },
              ]}
            >
              <MapPin color={themeColors.heroText} size={12} />
              <Text style={[styles.locationText, { color: themeColors.heroText }]} numberOfLines={1}>
                {city}, {region}
              </Text>
            </View>

            <View style={styles.detailCue}>
              <Text style={[styles.detailCueText, { color: themeColors.heroSubtext }]}>
                8 Waktu
              </Text>
              <ChevronRight color={themeColors.heroSubtext} size={14} />
            </View>
          </View>

          <View style={styles.centerBlock}>
            <Text style={[styles.nextTitle, { color: themeColors.heroSubtext }]}>
              Menuju {countdown.name}
            </Text>
            <View style={styles.timeRow}>
              <Text style={[styles.nextClock, { color: themeColors.heroText }]}>
                {countdown.time}
              </Text>
              <Text style={[styles.tzLabel, { color: themeColors.heroSubtext }]}>
                WIB
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
            </View>
          </View>

          <View style={styles.dateFooter}>
            <View style={styles.dateRow}>
              <Calendar color={themeColors.heroSubtext} size={12} />
              <Text style={[styles.gregorianText, { color: themeColors.heroText }]} numberOfLines={1}>
                {dateText}
              </Text>
            </View>
            <Text style={[styles.hijriText, { color: themeColors.heroSubtext }]}>
              {hijriText}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    overflow: 'hidden',
  },
  imageBg: {
    width: '100%',
  },
  overlay: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl + 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm + 4,
    gap: spacing.xs,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    flexShrink: 1,
  },
  locationText: {
    fontSize: 11,
    fontWeight: '600',
  },
  detailCue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  detailCueText: {
    fontSize: 11,
    fontWeight: '600',
  },
  centerBlock: {
    alignItems: 'center',
    marginBottom: spacing.sm + 2,
  },
  nextTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  nextClock: {
    fontSize: 30,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
    letterSpacing: 0.5,
  },
  tzLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 6,
  },
  countdownPill: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    marginLeft: 2,
  },
  countdownText: {
    fontSize: 12,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  dateFooter: {
    alignItems: 'center',
    gap: 2,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  gregorianText: {
    fontSize: 12,
    fontWeight: '600',
  },
  hijriText: {
    fontSize: 11,
    fontStyle: 'italic',
  },
});

