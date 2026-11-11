import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const MIN_FONT_SIZE = 18;
const MAX_FONT_SIZE = 40;
const DEFAULT_FONT_SIZE = 24;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(systemTheme === 'dark' ? 'dark' : 'light');
  const [fontSize, setFontSizeState] = useState(DEFAULT_FONT_SIZE);

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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
