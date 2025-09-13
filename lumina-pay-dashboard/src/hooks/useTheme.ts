import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

type ThemeProviderContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    // Fallback implementation for direct usage
    const [theme, setThemeState] = useState<Theme>(() => {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('theme') as Theme || 'light';
      }
      return 'light';
    });

    const setTheme = (newTheme: Theme) => {
      localStorage.setItem('theme', newTheme);
      setThemeState(newTheme);
      
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
    };

    const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }, [theme]);

    return { theme, setTheme, toggleTheme };
  }

  return context;
}