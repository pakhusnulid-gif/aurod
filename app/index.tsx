import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, Download } from 'lucide-react-native';
import {
  YasinMenuIcon,
  AurodMenuIcon,
  TawassulMenuIcon,
  TahlilMenuIcon,
  SholawatFatihMenuIcon,
  WebKasanMenuIcon,
} from '@/components/MenuColoredIcons';
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

type AppRoute = '/yasin' | '/aurod' | '/tawassul' | '/tahlil' | '/sholawat-fatih';

interface MenuItem {
  id: number;
  titleArabic: string;
  titleLatin: string;
  route?: AppRoute;
  externalUrl?: string;
  IconComponent: React.ComponentType<{ size?: number }>;
  accentColor: string;
  bgLight: string;
  borderLight: string;
  bgDark: string;
  borderDark: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    titleArabic: 'يٰس فَضِيْلَةُ أَلْفِ الصَّحْبِ',
    titleLatin: 'Yasin Fadhilah Alfas Shohbi',
    route: '/yasin',
    IconComponent: YasinMenuIcon,
    accentColor: '#059669',
    bgLight: '#ECFDF5',
    borderLight: '#A7F3D0',
    bgDark: '#062E22',
    borderDark: 'rgba(52, 211, 153, 0.35)',
  },
  {
    id: 2,
    titleArabic: 'أَوْرَادُ النِّظَامِيَّة',
    titleLatin: 'Aurod An-Nidhomiyyah',
    route: '/aurod',
    IconComponent: AurodMenuIcon,
    accentColor: '#0D9488',
    bgLight: '#F0FDFA',
    borderLight: '#99F6E4',
    bgDark: '#042F2E',
    borderDark: 'rgba(45, 212, 191, 0.35)',
  },
  {
    id: 3,
    titleArabic: 'التَّوَسُّلُ',
    titleLatin: 'Tawassul',
    route: '/tawassul',
    IconComponent: TawassulMenuIcon,
    accentColor: '#D97706',
    bgLight: '#FFFBEB',
    borderLight: '#FDE68A',
    bgDark: '#261C08',
    borderDark: 'rgba(251, 191, 36, 0.35)',
  },
  {
    id: 4,
    titleArabic: 'التَّهْلِيْلُ وَالدُّعَاءُ',
    titleLatin: 'Tahlil dan Doa',
    route: '/tahlil',
    IconComponent: TahlilMenuIcon,
    accentColor: '#047857',
    bgLight: '#E8F5E9',
    borderLight: '#C8E6C9',
    bgDark: '#0D2B24',
    borderDark: 'rgba(52, 211, 153, 0.3)',
  },
  {
    id: 5,
    titleArabic: 'الصَّلَوَاتُ الْفَاتِحُ',
    titleLatin: 'Sholawat Fatih',
    route: '/sholawat-fatih',
    IconComponent: SholawatFatihMenuIcon,
    accentColor: '#B45309',
    bgLight: '#FEF3C7',
    borderLight: '#FCD34D',
    bgDark: '#271A07',
    borderDark: 'rgba(251, 191, 36, 0.35)',
  },
  {
    id: 6,
    titleArabic: 'مَوْقِعُ كَسَانْ',
    titleLatin: 'Web Kasan',
    externalUrl: 'https://kasantuban.org',
    IconComponent: WebKasanMenuIcon,
    accentColor: '#0284C7',
    bgLight: '#E0F2FE',
    borderLight: '#7DD3FC',
    bgDark: '#082F49',
    borderDark: 'rgba(56, 189, 248, 0.35)',
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

  const isCompactWidth = width < 390;
  const horizontalPad = isCompactWidth ? spacing.sm + 4 : spacing.md + 2;
  const menuRows = [MENU_ITEMS.slice(0, 3), MENU_ITEMS.slice(3, 6)];

  const handleMenuPress = (item: MenuItem) => {
    if (item.externalUrl) {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        const opened = window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
        if (opened) return;
      }
      Linking.openURL(item.externalUrl).catch(() => {});
      return;
    }
    if (item.route) {
      router.push(item.route);
    }
  };

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
            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionLabel, { color: themeColors.textSecondary }]}>
                Amalan & Wirid Santri
              </Text>
              <Text
                style={[
                  styles.sectionArabicPill,
                  {
                    color: themeColors.primary,
                    backgroundColor: theme === 'dark' ? '#062E22' : '#ECFDF5',
                  },
                ]}
              >
                الأَوْرَادُ وَالأَدْعِيَةُ
              </Text>
            </View>

            <View style={styles.menuGrid}>
              {menuRows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.gridRow}>
                  {row.map((item) => {
                    const Icon = item.IconComponent;
                    const iconBg = theme === 'dark' ? item.bgDark : item.bgLight;
                    const iconBorder = theme === 'dark' ? item.borderDark : item.borderLight;

                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.gridCard,
                          {
                            backgroundColor: themeColors.card,
                            borderColor: themeColors.border,
                            shadowColor: themeColors.shadow,
                            minHeight: isCompactWidth ? 96 : 104,
                          },
                        ]}
                        onPress={() => handleMenuPress(item)}
                        activeOpacity={0.75}
                        accessibilityRole="button"
                        accessibilityLabel={
                          item.externalUrl
                            ? `${item.titleLatin} - Buka ${item.externalUrl}`
                            : `${item.titleLatin} - ${item.titleArabic}`
                        }
                      >
                        <View
                          style={[
                            styles.iconCircleBadge,
                            {
                              backgroundColor: iconBg,
                              borderColor: iconBorder,
                            },
                          ]}
                        >
                          <Icon size={25} />
                        </View>
                        <Text
                          style={[
                            styles.cardTitleArabic,
                            {
                              color: themeColors.text,
                              fontSize: isCompactWidth ? 12.5 : 13.5,
                              lineHeight: isCompactWidth ? 18 : 20,
                            },
                          ]}
                          numberOfLines={2}
                        >
                          {item.titleArabic}
                        </Text>
                        <Text
                          style={[
                            styles.cardTitleLatin,
                            {
                              color: themeColors.textSecondary,
                              fontSize: isCompactWidth ? 10 : 10.5,
                            },
                          ]}
                          numberOfLines={2}
                        >
                          {item.titleLatin}
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
    marginTop: -18,
    paddingTop: spacing.xs,
  },
  prayerStripOverlap: {
    marginTop: -spacing.xs,
    marginBottom: spacing.sm + 2,
  },
  sectionBlock: {
    marginBottom: spacing.md,
    gap: spacing.xs + 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  sectionArabicPill: {
    fontFamily: Platform.select({ web: 'Amiri-Bold, "Amiri", "Traditional Arabic", serif', default: 'Amiri-Bold' }),
    fontSize: 12.5,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  menuGrid: {
    gap: spacing.sm,
  },
  gridRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  gridCard: {
    flex: 1,
    paddingVertical: spacing.xs + 3,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  iconCircleBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  cardTitleArabic: {
    fontFamily: Platform.select({ web: 'Amiri-Bold, "Amiri", "Traditional Arabic", serif', default: 'Amiri-Bold' }),
    textAlign: 'center',
    userSelect: 'none',
  },
  cardTitleLatin: {
    fontWeight: '600',
    lineHeight: 13,
    textAlign: 'center',
    userSelect: 'none',
    marginTop: 2,
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
