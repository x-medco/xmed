'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const pathname = usePathname();

  const isAdminOrMail = pathname?.startsWith('/admin') || pathname?.startsWith('/mail');

  useEffect(() => {
    if (isAdminOrMail) {
      const savedAdminTheme = localStorage.getItem('admin_theme') as Theme | null;
      if (savedAdminTheme) {
        setTheme(savedAdminTheme);
      } else {
        setTheme('dark'); // Admin defaults to clean high-contrast dark dashboard
      }
    } else {
      setTheme('light'); // Storefront is ALWAYS in clean luminous light mode
    }
  }, [pathname, isAdminOrMail]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isAdminOrMail && theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    if (isAdminOrMail) {
      localStorage.setItem('admin_theme', theme);
    }
  }, [theme, isAdminOrMail]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
