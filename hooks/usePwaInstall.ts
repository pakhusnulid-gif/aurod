import { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type PwaPlatform = 'android' | 'ios' | 'desktop';

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

declare global {
  interface Window {
    __deferredPwaPrompt?: BeforeInstallPromptEvent | null;
  }
}

const DISMISSED_UNTIL_KEY = 'pwa_install_dismissed_until';
const NEVER_SHOW_KEY = 'pwa_install_never_show';
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
const AUTO_PROMPT_DELAY_MS = 1800;

function detectEnvironment(): {
  isStandalone: boolean;
  platformType: PwaPlatform;
  isInAppBrowser: boolean;
  isIosNonSafari: boolean;
} {
  if (Platform.OS !== 'web' || typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      isStandalone: true,
      platformType: 'desktop',
      isInAppBrowser: false,
      isIosNonSafari: false,
    };
  }

  const ua = navigator.userAgent || '';
  const nav = navigator as Navigator & { standalone?: boolean };

  const isStandalone =
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.matchMedia?.('(display-mode: fullscreen)').matches ||
    nav.standalone === true ||
    document.referrer.includes('android-app://');

  const isIos =
    /iphone|ipad|ipod/i.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /android/i.test(ua);
  const platformType: PwaPlatform = isIos ? 'ios' : isAndroid ? 'android' : 'desktop';

  const isInAppBrowser =
    /FBAN|FBAV|Instagram|WhatsApp|Line\/|BytedanceWebview|musical_ly|TikTok|MicroMessenger|Twitter|Snapchat/i.test(
      ua
    );
  const isIosNonSafari = isIos && (/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua) || isInAppBrowser);

  return { isStandalone, platformType, isInAppBrowser, isIosNonSafari };
}

export function usePwaInstall() {
  const [env, setEnv] = useState(detectEnvironment);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    const currentEnv = detectEnvironment();
    setEnv(currentEnv);

    if (window.__deferredPwaPrompt) {
      setDeferredPrompt(window.__deferredPwaPrompt);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      window.__deferredPwaPrompt = promptEvent;
      setDeferredPrompt(promptEvent);
    };

    const handleAppInstalled = () => {
      window.__deferredPwaPrompt = null;
      setDeferredPrompt(null);
      setJustInstalled(true);
      setModalVisible(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    let timer: ReturnType<typeof setTimeout> | null = null;
    let isMounted = true;

    if (!currentEnv.isStandalone) {
      Promise.all([
        AsyncStorage.getItem(NEVER_SHOW_KEY).catch(() => null),
        AsyncStorage.getItem(DISMISSED_UNTIL_KEY).catch(() => null),
      ]).then(([neverShow, dismissedUntil]) => {
        if (!isMounted) return;
        if (neverShow === 'true') return;
        const untilMs = dismissedUntil ? Number(dismissedUntil) : 0;
        if (Number.isFinite(untilMs) && untilMs > Date.now()) return;

        timer = setTimeout(() => {
          if (isMounted) setModalVisible(true);
        }, AUTO_PROMPT_DELAY_MS);
      });
    }

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const dismissLater = useCallback(() => {
    setModalVisible(false);
    const nextPromptTime = Date.now() + THREE_DAYS_MS;
    AsyncStorage.setItem(DISMISSED_UNTIL_KEY, String(nextPromptTime)).catch(() => {});
  }, []);

  const dismissForever = useCallback(() => {
    setModalVisible(false);
    AsyncStorage.setItem(NEVER_SHOW_KEY, 'true').catch(() => {});
  }, []);

  const triggerNativeInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
    const promptObj = deferredPrompt || (typeof window !== 'undefined' ? window.__deferredPwaPrompt : null);
    if (!promptObj) return 'unavailable';

    try {
      await promptObj.prompt();
      const choice = await promptObj.userChoice;
      if (choice.outcome === 'accepted') {
        window.__deferredPwaPrompt = null;
        setDeferredPrompt(null);
        setJustInstalled(true);
        setModalVisible(false);
        return 'accepted';
      }
      return 'dismissed';
    } catch {
      return 'unavailable';
    }
  }, [deferredPrompt]);

  const copyAppUrl = useCallback(async (): Promise<boolean> => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
    const url = window.location.origin;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        return true;
      }
    } catch {
      // Fallback below
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand('copy');
      document.body.removeChild(textarea);
      return copied;
    } catch {
      return false;
    }
  }, []);

  return {
    isWeb: Platform.OS === 'web',
    isInstalled: env.isStandalone || justInstalled,
    platformType: env.platformType,
    isInAppBrowser: env.isInAppBrowser,
    isIosNonSafari: env.isIosNonSafari,
    canInstallNatively: Boolean(deferredPrompt),
    modalVisible,
    openModal,
    dismissLater,
    dismissForever,
    triggerNativeInstall,
    copyAppUrl,
  };
}

