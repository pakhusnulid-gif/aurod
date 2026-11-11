import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { colors } from '@/constants/theme';
import { useFonts, Amiri_400Regular, Amiri_700Bold } from '@expo-google-fonts/amiri';
import * as SplashScreen from 'expo-splash-screen';

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
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  useFrameworkReady();
  const [fontTimedOut, setFontTimedOut] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'Amiri-Regular': Amiri_400Regular,
    'Amiri-Bold': Amiri_700Bold,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setFontTimedOut(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError || fontTimedOut) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError, fontTimedOut]);

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const registerServiceWorker = () => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js').catch((error) => {
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

      ensureHeadTag('meta[name="apple-mobile-web-app-capable"]', () => {
        const metaApple = document.createElement('meta');
        metaApple.name = 'apple-mobile-web-app-capable';
        metaApple.content = 'yes';
        return metaApple;
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

  if (!fontsLoaded && !fontError && !fontTimedOut) {
    return null;
  }

  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
