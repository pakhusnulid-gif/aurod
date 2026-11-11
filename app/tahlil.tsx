import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { AppShell } from '@/components/AppShell';
import { Navbar } from '@/components/Navbar';
import { ReadingSettingsModal } from '@/components/ReadingSettingsModal';
import { TasbihModal } from '@/components/TasbihModal';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';
import { getArabicFontFamily } from '@/constants/arabicFonts';
import { tahlilData, TahlilTab } from '@/constants/tahlilData';

const TABS: { key: TahlilTab; label: string }[] = [
  { key: 'tahlil', label: 'Tahlil' },
  { key: 'doa', label: 'Doa' },
];

export default function TahlilScreen() {
  const { theme, fontSize, arabicFont } = useTheme();
  const { width } = useWindowDimensions();
  const themeColors = colors[theme];
  const arabicFontRegular = getArabicFontFamily(arabicFont, 'regular');
  const arabicFontBold = getArabicFontFamily(arabicFont, 'bold');
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = useState<TahlilTab>('tahlil');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tasbihOpen, setTasbihOpen] = useState(false);

  const horizontalPad = width < 480 ? spacing.md : spacing.lg;
  const arabicLineHeight = Math.round(fontSize * 1.85);
  const visibleItems = tahlilData.filter((item) => item.tab === activeTab);

  const handleSelectTab = (tab: TahlilTab) => {
    setActiveTab(tab);
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  };

  return (
    <AppShell maxWidth={680}>
      <Navbar
        title="Tahlil dan Doa"
        showBack
        showTasbih
        onOpenTasbih={() => setTasbihOpen(true)}
        showReadingSettings
        onOpenReadingSettings={() => setSettingsOpen(true)}
      />

      <View
        style={[
          styles.tabBarWrapper,
          {
            backgroundColor: themeColors.background,
            borderBottomColor: themeColors.border,
            paddingHorizontal: horizontalPad,
          },
        ]}
      >
        <View
          style={[
            styles.tabGroup,
            {
              backgroundColor: themeColors.surface,
              borderColor: themeColors.border,
            },
          ]}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => handleSelectTab(tab.key)}
                activeOpacity={0.8}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                accessibilityLabel={`Tab ${tab.label}`}
                style={[
                  styles.tabButton,
                  isActive && { backgroundColor: themeColors.primary },
                ]}
              >
                <Text
                  style={[
                    styles.tabLabel,
                    { color: isActive ? themeColors.onPrimary : themeColors.textSecondary },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPad }]}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[
            styles.mainTitle,
            {
              color: themeColors.primary,
              fontFamily: arabicFontBold,
              fontSize: fontSize + 6,
              lineHeight: Math.round((fontSize + 6) * 1.6),
            },
          ]}
        >
          {activeTab === 'tahlil' ? 'التَّهْلِيْلُ وَالدُّعَاءُ' : 'دُعَاءُ التَّهْلِيلِ'}
        </Text>

        {visibleItems.map((item) => (
          <View
            key={item.id}
            style={[
              styles.section,
              item.isColophon && [
                styles.colophonCard,
                {
                  backgroundColor: themeColors.calloutBg,
                  borderColor: themeColors.calloutBorder,
                },
              ],
            ]}
          >
            <Text
              style={[
                item.isColophon ? styles.colophonText : styles.arabicText,
                {
                  color: item.isColophon ? themeColors.calloutText : themeColors.text,
                  fontFamily: arabicFontRegular,
                  fontSize: item.isColophon ? Math.max(16, fontSize - 4) : fontSize,
                  lineHeight: item.isColophon
                    ? Math.round(Math.max(16, fontSize - 4) * 1.7)
                    : arabicLineHeight,
                },
              ]}
            >
              {item.arabic}
            </Text>
          </View>
        ))}

        {activeTab === 'tahlil' && (
          <TouchableOpacity
            onPress={() => handleSelectTab('doa')}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Lanjut baca Doa Tahlil"
            style={[
              styles.nextTabCard,
              {
                backgroundColor: themeColors.calloutBg,
                borderColor: themeColors.calloutBorder,
              },
            ]}
          >
            <Text style={[styles.nextTabText, { color: themeColors.primary }]}>
              Lanjut ke Doa Tahlil
            </Text>
            <ChevronRight color={themeColors.primary} size={18} />
          </TouchableOpacity>
        )}

        <Footer />
      </ScrollView>

      <ReadingSettingsModal
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        showTranslationOption={false}
      />

      <TasbihModal
        visible={tasbihOpen}
        label="Tahlil Utama (41x)"
        target={41}
        onClose={() => setTasbihOpen(false)}
      />
    </AppShell>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    borderBottomWidth: 1,
    paddingVertical: spacing.xs + 2,
  },
  tabGroup: {
    flexDirection: 'row',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: 3,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    minHeight: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  content: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  mainTitle: {
    textAlign: 'center',
    writingDirection: 'rtl',
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  arabicText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  colophonCard: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
  },
  colophonText: {
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  nextTabCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    minHeight: 46,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  nextTabText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
