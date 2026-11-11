import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { Asset } from 'expo-asset';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { colors } from '@/constants/theme';
import { useFonts, Amiri_400Regular, Amiri_700Bold } from '@expo-google-fonts/amiri';
import {
  ScheherazadeNew_400Regular,
  ScheherazadeNew_700Bold,
} from '@expo-google-fonts/scheherazade-new';
import * as SplashScreen from 'expo-splash-screen';

const UTHMANIC_FONT_ASSET = require('@/assets/fonts/UthmanicHafs.ttf');
const LPMQ_FONT_ASSET = require('@/assets/fonts/LPMQ-IsepMisbah.ttf');

function resolveFontUri(source: unknown): string | null {
  if (typeof source === 'string') return source || null;
  if (typeof source === 'number') {
    const resolved = Asset.fromModule(source);
    return resolved.uri || resolved.localUri || null;
  }
  if (typeof source === 'object' && source !== null) {
    const obj = source as { uri?: unknown; localUri?: string; default?: string };
    if (typeof obj.uri === 'number') return resolveFontUri(obj.uri);
    if (typeof obj.uri === 'string') return obj.uri;
    return obj.localUri || obj.default || null;
  }
  return null;
}

SplashScreen.preventAutoHideAsync();

function ensureHeadTag(selector: string, createTag: () => HTMLElement) {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = createTag();
    document.head.appendChild(el);
  }
  return el;
}

function RootLayoutContent() {
  const { theme } = useTheme();

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    const metaTheme = ensureHeadTag('meta[name="theme-color"]', () => {
      const el = document.createElement('meta');
      el.name = 'theme-color';
      return el;
    }) as HTMLMetaElement;
    metaTheme.content = colors[theme].surface;
  }, [theme]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="yasin" />
        <Stack.Screen name="aurod" />
        <Stack.Screen name="tawassul" />
        <Stack.Screen name="tahlil" />
        <Stack.Screen name="sholawat-fatih" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  useFrameworkReady();
  const [fontTimedOut, setFontTimedOut] = useState(false);
  const [uthmanicReady, setUthmanicReady] = useState(Platform.OS !== 'web');

  // UthmanicHafs lacks Latin 'BESbswy' test glyphs used by FontFaceObserver on web,
  // so register it natively via FontFace API on web while native loads all faces directly.
  const [fontsLoaded, fontError] = useFonts(
    Platform.OS === 'web'
      ? {
          'Amiri-Regular': Amiri_400Regular,
          'Amiri-Bold': Amiri_700Bold,
          'ScheherazadeNew-Regular': ScheherazadeNew_400Regular,
          'ScheherazadeNew-Bold': ScheherazadeNew_700Bold,
          'LPMQ-IsepMisbah': LPMQ_FONT_ASSET,
        }
      : {
          'Amiri-Regular': Amiri_400Regular,
          'Amiri-Bold': Amiri_700Bold,
          'ScheherazadeNew-Regular': ScheherazadeNew_400Regular,
          'ScheherazadeNew-Bold': ScheherazadeNew_700Bold,
          'UthmanicHafs': UTHMANIC_FONT_ASSET,
          'LPMQ-IsepMisbah': LPMQ_FONT_ASSET,
        }
  );

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const uri = resolveFontUri(UTHMANIC_FONT_ASSET);
    if (!uri) {
      setUthmanicReady(true);
      return;
    }

    const styleEl = ensureHeadTag('style#aurod-custom-fonts', () => {
      const el = document.createElement('style');
      el.id = 'aurod-custom-fonts';
      return el;
    });
    styleEl.textContent = `@font-face{font-family:"UthmanicHafs";src:url("${uri}");font-display:swap;}`;

    let cancelled = false;
    if (typeof FontFace !== 'undefined') {
      const face = new FontFace('UthmanicHafs', `url("${uri}")`, { display: 'swap' });
      face
        .load()
        .then((loaded) => {
          (document.fonts as unknown as { add?: (f: FontFace) => void }).add?.(loaded);
          if (!cancelled) setUthmanicReady(true);
        })
        .catch(() => {
          if (!cancelled) setUthmanicReady(true);
        });
    } else {
      setUthmanicReady(true);
    }
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFontTimedOut(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const allFontsReady = ((fontsLoaded || Boolean(fontError)) && uthmanicReady) || fontTimedOut;

  useEffect(() => {
    if (allFontsReady) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [allFontsReady]);

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const registerServiceWorker = () => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker
            .register('/sw.js')
            .then((registration) => {
              registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (!newWorker) return;
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                  }
                });
              });
            })
            .catch((error) => {
              console.error('Service Worker registration failed:', error);
            });
        }
      };

      if (document.readyState === 'complete') {
        registerServiceWorker();
      } else {
        window.addEventListener('load', registerServiceWorker);
      }

      ensureHeadTag('link[rel="manifest"]', () => {
        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = '/manifest.json';
        return link;
      });

      ensureHeadTag('link[rel="apple-touch-icon"]', () => {
        const touchIcon = document.createElement('link');
        touchIcon.rel = 'apple-touch-icon';
        touchIcon.href = '/icon-192.png';
        return touchIcon;
      });

      ensureHeadTag('meta[name="apple-mobile-web-app-capable"]', () => {
        const metaApple = document.createElement('meta');
        metaApple.name = 'apple-mobile-web-app-capable';
        metaApple.content = 'yes';
        return metaApple;
      });

      ensureHeadTag('meta[name="apple-mobile-web-app-title"]', () => {
        const metaTitle = document.createElement('meta');
        metaTitle.name = 'apple-mobile-web-app-title';
        metaTitle.content = 'Aurod';
        return metaTitle;
      });

      ensureHeadTag('meta[name="mobile-web-app-capable"]', () => {
        const metaMobile = document.createElement('meta');
        metaMobile.name = 'mobile-web-app-capable';
        metaMobile.content = 'yes';
        return metaMobile;
      });

      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
      }

      document.body.style.overscrollBehaviorY = 'contain';
      document.body.style.overscrollBehaviorX = 'none';
      document.documentElement.style.overscrollBehaviorY = 'contain';
      document.documentElement.style.overscrollBehaviorX = 'none';

      return () => {
        window.removeEventListener('load', registerServiceWorker);
      };
    }
  }, []);

  if (!allFontsReady) {
    return null;
  }

  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
