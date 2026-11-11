import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  BookOpen,
  ScrollText,
  Hand,
  Layers,
  ChevronRight,
  Download,
} from 'lucide-react-native';
import { AppShell } from '@/components/AppShell';
import { Navbar } from '@/components/Navbar';
import { HeroKubah } from '@/components/HeroKubah';
import { PrayerTimes } from '@/components/PrayerTimes';
import { PrayerDetailModal } from '@/components/PrayerDetailModal';
import { PwaInstallModal } from '@/components/PwaInstallModal';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { colors, spacing, borderRadius } from '@/constants/theme';
import { getCurrentLocation, LocationData } from '@/utils/locationService';

const SANAD_IMAGE = require('@/assets/images/sanad-kitab.jpg');
const MAJELIS_IMAGE = require('@/assets/images/majelis-rutinan.jpg');

interface MenuItem {
  id: number;
  title: string;
  route: '/yasin' | '/aurod' | '/tawassul' | '/tahlil';
  icon: typeof BookOpen;
  color: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    title: 'Yasin Fadhilah',
    route: '/yasin',
    icon: BookOpen,
    color: '#047857',
  },
  {
    id: 2,
    title: 'Aurod',
    route: '/aurod',
    icon: ScrollText,
    color: '#0F766E',
  },
  {
    id: 3,
    title: 'Tawassul',
    route: '/tawassul',
    icon: Hand,
    color: '#065F46',
  },
  {
    id: 4,
    title: 'Tahlil',
    route: '/tahlil',
    icon: Layers,
    color: '#115E59',
  },
];

const DEFAULT_LOCATION: LocationData = {
  latitude: -6.8976,
  longitude: 112.0478,
  city: 'Tuban',
  region: 'Jawa Timur',
};

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const themeColors = colors[theme];
  const [location, setLocation] = useState<LocationData>(DEFAULT_LOCATION);
  const [prayerModalOpen, setPrayerModalOpen] = useState(false);

  const pwaInstall = usePwaInstall();

  useEffect(() => {
    let isMounted = true;
    getCurrentLocation()
      .then((loc) => {
        if (isMounted) setLocation(loc);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const horizontalPad = width < 380 ? spacing.md : spacing.md + 4;
  const menuRows = [MENU_ITEMS.slice(0, 2), MENU_ITEMS.slice(2, 4)];

  return (
    <AppShell maxWidth={480}>
      <Navbar title="Aurod An-Nidhomiyyah" showBrandLogo />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeroKubah
          latitude={location.latitude}
          longitude={location.longitude}
          city={location.city}
          region={location.region}
          onPressSchedule={() => setPrayerModalOpen(true)}
        />

        <View
          style={[
            styles.archBody,
            {
              backgroundColor: themeColors.background,
              paddingHorizontal: horizontalPad,
            },
          ]}
        >
          <View style={styles.prayerStripOverlap}>
            <PrayerTimes onOpenDetail={() => setPrayerModalOpen(true)} />
          </View>

          <View style={styles.sectionBlock}>
            <Text style={[styles.sectionLabel, { color: themeColors.textSecondary }]}>
              Amalan Santri
            </Text>
            <View style={styles.menuGrid}>
              {menuRows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.gridRow}>
                  {row.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.gridCard,
                          {
                            backgroundColor: themeColors.card,
                            borderColor: themeColors.border,
                            shadowColor: themeColors.shadow,
                          },
                        ]}
                        onPress={() => router.push(item.route)}
                        activeOpacity={0.75}
                        accessibilityRole="button"
                        accessibilityLabel={item.title}
                      >
                        <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
                          <IconComponent color="#F8FAF9" size={22} />
                        </View>
                        <Text style={[styles.cardTitle, { color: themeColors.text }]} numberOfLines={1}>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>

          <View style={styles.sectionBlock}>
            <Text style={[styles.sectionLabel, { color: themeColors.textSecondary }]}>
              Pesantren & Sanad
            </Text>

            <TouchableOpacity
              onPress={() => router.push({ pathname: '/aurod', params: { section: 'sanad' } })}
              activeOpacity={0.78}
              accessibilityRole="button"
              accessibilityLabel="Buka Silsilah Sanad Aurod KH. Ahmad Musyaffa"
              style={[
                styles.editorialCard,
                {
                  backgroundColor: themeColors.card,
                  borderColor: themeColors.border,
                  shadowColor: themeColors.shadow,
                },
              ]}
            >
              <Image source={SANAD_IMAGE} style={styles.editorialThumb} />
              <View style={styles.editorialBody}>
                <Text style={[styles.editorialTag, { color: themeColors.primary }]}>
                  Silsilah Sanad
                </Text>
                <Text style={[styles.editorialTitle, { color: themeColors.text }]} numberOfLines={2}>
                  Sanad Aurod Lazimah Thoriqoh
                </Text>
                <Text style={[styles.editorialSub, { color: themeColors.textSecondary }]} numberOfLines={1}>
                  KH. Ahmad Musyaffa&apos; bin Ma&apos;sum
                </Text>
              </View>
              <ChevronRight color={themeColors.textSecondary} size={18} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push({ pathname: '/aurod', params: { section: 'hailalah' } })}
              activeOpacity={0.78}
              accessibilityRole="button"
              accessibilityLabel="Buka panduan Rutinan Hailalah Jum'at Ba'da Ashar"
              style={[
                styles.editorialCard,
                {
                  backgroundColor: themeColors.card,
                  borderColor: themeColors.border,
                  shadowColor: themeColors.shadow,
                },
              ]}
            >
              <Image source={MAJELIS_IMAGE} style={styles.editorialThumb} />
              <View style={styles.editorialBody}>
                <Text style={[styles.editorialTag, { color: themeColors.primary }]}>
                  Jadwal Rutinan
                </Text>
                <Text style={[styles.editorialTitle, { color: themeColors.text }]} numberOfLines={2}>
                  Hailalah Jum&apos;at Ba&apos;da Ashar
                </Text>
                <Text style={[styles.editorialSub, { color: themeColors.textSecondary }]} numberOfLines={1}>
                  Pondok Pesantren An-Nidhomiyyah Tuban
                </Text>
              </View>
              <ChevronRight color={themeColors.textSecondary} size={18} />
            </TouchableOpacity>
          </View>

          {pwaInstall.isWeb && !pwaInstall.isInstalled && (
            <TouchableOpacity
              onPress={pwaInstall.openModal}
              activeOpacity={0.78}
              accessibilityRole="button"
              accessibilityLabel="Buka panduan pasang aplikasi ke layar utama"
              style={[
                styles.installBanner,
                {
                  backgroundColor: themeColors.calloutBg,
                  borderColor: themeColors.calloutBorder,
                },
              ]}
            >
              <View style={[styles.installIconWrap, { backgroundColor: themeColors.primary }]}>
                <Download color={themeColors.onPrimary} size={18} />
              </View>
              <View style={styles.installTextWrap}>
                <Text style={[styles.installTitle, { color: themeColors.primary }]}>
                  Pasang Aplikasi ke Layar Utama
                </Text>
                <Text style={[styles.installSub, { color: themeColors.calloutText }]}>
                  Bisa dibuka offline di Android & iPhone
                </Text>
              </View>
              <ChevronRight color={themeColors.primary} size={18} />
            </TouchableOpacity>
          )}

          <Footer />
        </View>
      </ScrollView>

      <PrayerDetailModal
        visible={prayerModalOpen}
        onClose={() => setPrayerModalOpen(false)}
        latitude={location.latitude}
        longitude={location.longitude}
        city={location.city}
        region={location.region}
      />

      {pwaInstall.isWeb && (
        <PwaInstallModal
          visible={pwaInstall.modalVisible}
          platformType={pwaInstall.platformType}
          isInAppBrowser={pwaInstall.isInAppBrowser}
          isIosNonSafari={pwaInstall.isIosNonSafari}
          canInstallNatively={pwaInstall.canInstallNatively}
          onTriggerNativeInstall={pwaInstall.triggerNativeInstall}
          onCopyUrl={pwaInstall.copyAppUrl}
          onDismissLater={pwaInstall.dismissLater}
          onDismissForever={pwaInstall.dismissForever}
        />
      )}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  archBody: {
    borderTopLeftRadius: borderRadius.xl + 4,
    borderTopRightRadius: borderRadius.xl + 4,
    marginTop: -20,
    paddingTop: spacing.xs,
  },
  prayerStripOverlap: {
    marginTop: -spacing.xs,
    marginBottom: spacing.md,
  },
  sectionBlock: {
    marginBottom: spacing.md + 2,
    gap: spacing.sm,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  menuGrid: {
    gap: spacing.sm + 4,
  },
  gridRow: {
    flexDirection: 'row',
    gap: spacing.sm + 4,
  },
  gridCard: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm + 4,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 102,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs + 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    userSelect: 'none',
  },
  editorialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm + 2,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    gap: spacing.sm + 4,
    minHeight: 84,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  editorialThumb: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.md,
  },
  editorialBody: {
    flex: 1,
    gap: 2,
  },
  editorialTag: {
    fontSize: 11,
    fontWeight: '700',
  },
  editorialTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  editorialSub: {
    fontSize: 12,
  },
  installBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm + 4,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    gap: spacing.sm + 2,
    minHeight: 62,
  },
  installIconWrap: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  installTextWrap: {
    flex: 1,
    gap: 1,
  },
  installTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  installSub: {
    fontSize: 12,
  },
});
