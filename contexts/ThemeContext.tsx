import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  showTranslation: boolean;
  setShowTranslation: (value: boolean) => void;
  showLatin: boolean;
  setShowLatin: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const MIN_FONT_SIZE = 18;
export const MAX_FONT_SIZE = 40;
export const DEFAULT_FONT_SIZE = 24;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(systemTheme === 'dark' ? 'dark' : 'light');
  const [fontSize, setFontSizeState] = useState(DEFAULT_FONT_SIZE);
  const [showTranslation, setShowTranslationState] = useState(true);
  const [showLatin, setShowLatinState] = useState(true);

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem('theme')
      .then((savedTheme) => {
        if (isMounted && (savedTheme === 'light' || savedTheme === 'dark')) {
          setTheme(savedTheme);
        }
      })
      .catch(() => {});

    AsyncStorage.getItem('fontSize')
      .then((savedSize) => {
        if (!isMounted || !savedSize) return;
        const parsed = Number(savedSize);
        if (Number.isFinite(parsed) && parsed >= MIN_FONT_SIZE && parsed <= MAX_FONT_SIZE) {
          setFontSizeState(parsed);
        }
      })
      .catch(() => {});

    AsyncStorage.getItem('showTranslation')
      .then((saved) => {
        if (isMounted && (saved === 'true' || saved === 'false')) {
          setShowTranslationState(saved === 'true');
        }
      })
      .catch(() => {});

    AsyncStorage.getItem('showLatin')
      .then((saved) => {
        if (isMounted && (saved === 'true' || saved === 'false')) {
          setShowLatinState(saved === 'true');
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme: Theme = prevTheme === 'light' ? 'dark' : 'light';
      AsyncStorage.setItem('theme', newTheme).catch(() => {});
      return newTheme;
    });
  };

  const setFontSize = (size: number) => {
    const clamped = Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, Math.round(size)));
    setFontSizeState(clamped);
    AsyncStorage.setItem('fontSize', clamped.toString()).catch(() => {});
  };

  const setShowTranslation = (value: boolean) => {
    setShowTranslationState(value);
    AsyncStorage.setItem('showTranslation', String(value)).catch(() => {});
  };

  const setShowLatin = (value: boolean) => {
    setShowLatinState(value);
    AsyncStorage.setItem('showLatin', String(value)).catch(() => {});
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        fontSize,
        setFontSize,
        showTranslation,
        setShowTranslation,
        showLatin,
        setShowLatin,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
