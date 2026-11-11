import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  X,
  Download,
  Share,
  SquarePlus,
  MoreVertical,
  WifiOff,
  Smartphone,
  Zap,
  Copy,
  Check,
  CircleAlert,
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';
import type { PwaPlatform } from '@/hooks/usePwaInstall';

const LOGO_PESANTREN = require('@/assets/images/logo-pesantren.jpg');

interface PwaInstallModalProps {
  visible: boolean;
  platformType: PwaPlatform;
  isInAppBrowser: boolean;
  isIosNonSafari: boolean;
  canInstallNatively: boolean;
  onTriggerNativeInstall: () => Promise<'accepted' | 'dismissed' | 'unavailable'>;
  onCopyUrl: () => Promise<boolean>;
  onDismissLater: () => void;
  onDismissForever: () => void;
}

const BENEFITS = [
  {
    icon: WifiOff,
    title: 'Bisa Dibaca Tanpa Internet (Offline)',
    desc: 'Yasin Fadhilah, Aurod, Tawassul, dan Tahlil tetap terbuka meski tanpa sinyal atau kuota.',
  },
  {
    icon: Smartphone,
    title: 'Ikon Langsung di Layar Utama HP',
    desc: 'Buka sekali ketuk dalam tampilan layar penuh seperti aplikasi asli tanpa bilah browser.',
  },
  {
    icon: Zap,
    title: 'Ringan & Hemat Memori',
    desc: 'Tidak perlu unduh APK besar. Sudah termasuk jadwal salat Kemenag Tuban dan tasbih digital.',
  },
];

export function PwaInstallModal({
  visible,
  platformType,
  isInAppBrowser,
  isIosNonSafari,
  canInstallNatively,
  onTriggerNativeInstall,
  onCopyUrl,
  onDismissLater,
  onDismissForever,
}: PwaInstallModalProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const themeColors = colors[theme];
  const [activeTab, setActiveTab] = useState<'android' | 'ios'>(
    platformType === 'ios' ? 'ios' : 'android'
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (visible) {
      setActiveTab(platformType === 'ios' ? 'ios' : 'android');
      setCopied(false);
    }
  }, [visible, platformType]);

  const handleCopy = async () => {
    const ok = await onCopyUrl();
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismissLater}
    >
      <Pressable style={styles.backdrop} onPress={onDismissLater}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={[
            styles.dialogCard,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.border,
              shadowColor: themeColors.shadow,
              marginBottom: Math.max(insets.bottom, spacing.md),
            },
          ]}
        >
          <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
            <Image source={LOGO_PESANTREN} style={styles.logo} />
            <View style={styles.headerTextWrap}>
              <Text style={[styles.title, { color: themeColors.text }]}>
                Pasang Aplikasi Aurod
              </Text>
              <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
                Pondok Pesantren An-Nidhomiyyah Tuban
              </Text>
            </View>
            <TouchableOpacity
              onPress={onDismissLater}
              style={styles.closeBtn}
              accessibilityRole="button"
              accessibilityLabel="Tutup panduan pemasangan aplikasi"
            >
              <X color={themeColors.textSecondary} size={20} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {isInAppBrowser && (
              <View
                style={[
                  styles.warningBox,
                  {
                    backgroundColor: themeColors.badgeWarningBg,
                    borderColor: themeColors.badgeWarningBorder,
                  },
                ]}
              >
                <View style={styles.warningHeader}>
                  <CircleAlert color={themeColors.badgeWarningText} size={17} />
                  <Text style={[styles.warningTitle, { color: themeColors.badgeWarningText }]}>
                    Dibuka dari Browser Dalam Aplikasi
                  </Text>
                </View>
                <Text style={[styles.warningBody, { color: themeColors.badgeWarningText }]}>
                  Browser bawaan WhatsApp, Instagram, atau media sosial membatasi pemasangan aplikasi. Salin tautan ini lalu buka di Safari (iPhone) atau Chrome (Android).
                </Text>
                <TouchableOpacity
                  onPress={handleCopy}
                  activeOpacity={0.8}
                  style={[
                    styles.copyBtn,
                    {
                      backgroundColor: themeColors.card,
                      borderColor: themeColors.badgeWarningBorder,
                    },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Salin tautan aplikasi"
                >
                  {copied ? (
                    <Check color={themeColors.primary} size={15} />
                  ) : (
                    <Copy color={themeColors.badgeWarningText} size={15} />
                  )}
                  <Text
                    style={[
                      styles.copyBtnText,
                      { color: copied ? themeColors.primary : themeColors.badgeWarningText },
                    ]}
                  >
                    {copied ? 'Tautan Berhasil Disalin' : 'Salin Tautan Aplikasi'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.benefitsSection}>
              <Text style={[styles.sectionHeading, { color: themeColors.text }]}>
                Manfaat Setelah Dipasang
              </Text>
              {BENEFITS.map((item) => {
                const IconComp = item.icon;
                return (
                  <View key={item.title} style={styles.benefitRow}>
                    <View
                      style={[
                        styles.benefitIconBox,
                        { backgroundColor: themeColors.surface, borderColor: themeColors.border },
                      ]}
                    >
                      <IconComp color={themeColors.primary} size={17} />
                    </View>
                    <View style={styles.benefitTextWrap}>
                      <Text style={[styles.benefitTitle, { color: themeColors.text }]}>
                        {item.title}
                      </Text>
                      <Text style={[styles.benefitDesc, { color: themeColors.textSecondary }]}>
                        {item.desc}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <View
              style={[
                styles.tabBar,
                {
                  backgroundColor: themeColors.surface,
                  borderColor: themeColors.border,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => setActiveTab('android')}
                style={[
                  styles.tabButton,
                  activeTab === 'android' && { backgroundColor: themeColors.primary },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Panduan pemasangan untuk Android"
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        activeTab === 'android'
                          ? themeColors.onPrimary
                          : themeColors.textSecondary,
                    },
                  ]}
                >
                  Android
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveTab('ios')}
                style={[
                  styles.tabButton,
                  activeTab === 'ios' && { backgroundColor: themeColors.primary },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Panduan pemasangan untuk iPhone dan iPad"
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        activeTab === 'ios'
                          ? themeColors.onPrimary
                          : themeColors.textSecondary,
                    },
                  ]}
                >
                  iPhone / iPad
                </Text>
              </TouchableOpacity>
            </View>

            {activeTab === 'android' ? (
              <View
                style={[
                  styles.guideBox,
                  {
                    backgroundColor: themeColors.calloutBg,
                    borderColor: themeColors.calloutBorder,
                  },
                ]}
              >
                {canInstallNatively && (
                  <TouchableOpacity
                    onPress={onTriggerNativeInstall}
                    activeOpacity={0.85}
                    style={[
                      styles.nativeInstallBtn,
                      { backgroundColor: themeColors.primary },
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel="Pasang aplikasi langsung ke perangkat Android"
                  >
                    <Download color={themeColors.onPrimary} size={18} />
                    <Text style={[styles.nativeInstallText, { color: themeColors.onPrimary }]}>
                      Pasang Aplikasi Sekarang
                    </Text>
                  </TouchableOpacity>
                )}

                <Text style={[styles.guideTitle, { color: themeColors.calloutText }]}>
                  {canInstallNatively
                    ? 'Atau pasang manual lewat Chrome / Edge:'
                    : 'Cara pasang di Android (Chrome / Edge):'}
                </Text>

                <View style={styles.stepRow}>
                  <View style={[styles.stepBadge, { backgroundColor: themeColors.primary }]}>
                    <Text style={[styles.stepNumber, { color: themeColors.onPrimary }]}>1</Text>
                  </View>
                  <Text style={[styles.stepText, { color: themeColors.text }]}>
                    Pastikan halaman ini dibuka di <Text style={styles.bold}>Google Chrome</Text> atau{' '}
                    <Text style={styles.bold}>Microsoft Edge</Text>.
                  </Text>
                </View>

                <View style={styles.stepRow}>
                  <View style={[styles.stepBadge, { backgroundColor: themeColors.primary }]}>
                    <Text style={[styles.stepNumber, { color: themeColors.onPrimary }]}>2</Text>
                  </View>
                  <View style={styles.stepInlineWrap}>
                    <Text style={[styles.stepText, { color: themeColors.text }]}>
                      Ketuk ikon menu{' '}
                    </Text>
                    <MoreVertical color={themeColors.primary} size={15} />
                    <Text style={[styles.stepText, { color: themeColors.text }]}>
                      {' '}di pojok kanan atas browser.
                    </Text>
                  </View>
                </View>

                <View style={styles.stepRow}>
                  <View style={[styles.stepBadge, { backgroundColor: themeColors.primary }]}>
                    <Text style={[styles.stepNumber, { color: themeColors.onPrimary }]}>3</Text>
                  </View>
                  <Text style={[styles.stepText, { color: themeColors.text }]}>
                    Pilih <Text style={styles.bold}>Tambahkan ke layar utama</Text> atau{' '}
                    <Text style={styles.bold}>Instal aplikasi</Text>, lalu tekan{' '}
                    <Text style={styles.bold}>Instal</Text>.
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  styles.guideBox,
                  {
                    backgroundColor: themeColors.calloutBg,
                    borderColor: themeColors.calloutBorder,
                  },
                ]}
              >
                {isIosNonSafari && !isInAppBrowser && (
                  <View
                    style={[
                      styles.iosTipBox,
                      {
                        backgroundColor: themeColors.badgeInfoBg,
                        borderColor: themeColors.badgeInfoBorder,
                      },
                    ]}
                  >
                    <Text style={[styles.iosTipText, { color: themeColors.badgeInfoText }]}>
                      Disarankan membuka tautan ini di browser Safari agar opsi Tambah ke Layar Utama muncul lengkap.
                    </Text>
                    <TouchableOpacity
                      onPress={handleCopy}
                      style={styles.inlineCopyLink}
                      accessibilityRole="button"
                    >
                      <Text style={[styles.inlineCopyText, { color: themeColors.badgeInfoText }]}>
                        {copied ? 'Tautan disalin' : 'Salin tautan untuk Safari'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                <Text style={[styles.guideTitle, { color: themeColors.calloutText }]}>
                  Cara pasang di iPhone / iPad (Safari):
                </Text>

                <View style={styles.stepRow}>
                  <View style={[styles.stepBadge, { backgroundColor: themeColors.primary }]}>
                    <Text style={[styles.stepNumber, { color: themeColors.onPrimary }]}>1</Text>
                  </View>
                  <Text style={[styles.stepText, { color: themeColors.text }]}>
                    Buka situs ini di aplikasi browser <Text style={styles.bold}>Safari</Text>.
                  </Text>
                </View>

                <View style={styles.stepRow}>
                  <View style={[styles.stepBadge, { backgroundColor: themeColors.primary }]}>
                    <Text style={[styles.stepNumber, { color: themeColors.onPrimary }]}>2</Text>
                  </View>
                  <View style={styles.stepInlineWrap}>
                    <Text style={[styles.stepText, { color: themeColors.text }]}>
                      Ketuk tombol <Text style={styles.bold}>Bagikan (Share)</Text>{' '}
                    </Text>
                    <Share color={themeColors.primary} size={15} />
                    <Text style={[styles.stepText, { color: themeColors.text }]}>
                      {' '}di bilah bawah atau atas Safari.
                    </Text>
                  </View>
                </View>

                <View style={styles.stepRow}>
                  <View style={[styles.stepBadge, { backgroundColor: themeColors.primary }]}>
                    <Text style={[styles.stepNumber, { color: themeColors.onPrimary }]}>3</Text>
                  </View>
                  <View style={styles.stepInlineWrap}>
                    <Text style={[styles.stepText, { color: themeColors.text }]}>
                      Geser menu ke bawah, pilih{' '}
                      <Text style={styles.bold}>Tambah ke Layar Utama</Text>{' '}
                    </Text>
                    <SquarePlus color={themeColors.primary} size={15} />
                    <Text style={[styles.stepText, { color: themeColors.text }]}>
                      {' '}lalu ketuk <Text style={styles.bold}>Tambah (Add)</Text>.
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          <View style={[styles.footerActions, { borderTopColor: themeColors.border }]}>
            <TouchableOpacity
              onPress={onDismissLater}
              activeOpacity={0.8}
              style={[
                styles.laterBtn,
                {
                  backgroundColor: themeColors.badgeNeutralBg,
                  borderColor: themeColors.badgeNeutralBorder,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Ingatkan nanti"
            >
              <Text style={[styles.laterBtnText, { color: themeColors.badgeNeutralText }]}>
                Ingatkan Nanti
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onDismissForever}
              activeOpacity={0.7}
              style={styles.neverBtn}
              accessibilityRole="button"
              accessibilityLabel="Jangan tampilkan dialog pemasangan ini lagi"
            >
              <Text style={[styles.neverBtnText, { color: themeColors.textSecondary }]}>
                Jangan tampilkan lagi
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 23, 0.62)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  dialogCard: {
    width: '100%',
    maxWidth: 460,
    maxHeight: '88%',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    gap: spacing.sm + 4,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
  },
  headerTextWrap: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  closeBtn: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollArea: {
    flexGrow: 0,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  warningBox: {
    padding: spacing.sm + 4,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    gap: spacing.xs + 2,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  warningTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  warningBody: {
    fontSize: 12,
    lineHeight: 18,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    minHeight: 40,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    marginTop: 2,
  },
  copyBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  benefitsSection: {
    gap: spacing.sm + 2,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm + 2,
  },
  benefitIconBox: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  benefitTextWrap: {
    flex: 1,
    gap: 1,
  },
  benefitTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  benefitDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  tabBar: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    minHeight: 40,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
  },
  guideBox: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    gap: spacing.sm + 2,
  },
  nativeInstallBtn: {
    minHeight: 48,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs + 2,
    paddingHorizontal: spacing.md,
  },
  nativeInstallText: {
    fontSize: 14,
    fontWeight: '700',
  },
  guideTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  stepBadge: {
    width: 22,
    height: 22,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumber: {
    fontSize: 11,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  stepInlineWrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  stepText: {
    flexShrink: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  bold: {
    fontWeight: '700',
  },
  iosTipBox: {
    padding: spacing.sm + 2,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    gap: 4,
  },
  iosTipText: {
    fontSize: 12,
    lineHeight: 17,
  },
  inlineCopyLink: {
    minHeight: 36,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  inlineCopyText: {
    fontSize: 12,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  footerActions: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm + 2,
    paddingBottom: spacing.sm,
    borderTopWidth: 1,
    gap: 4,
  },
  laterBtn: {
    minHeight: 44,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  laterBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  neverBtn: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  neverBtnText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

