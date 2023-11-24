import { useEffect, useState } from 'react';

const colorSchemes = {
  light: '(prefers-color-scheme: light)',
  dark: '(prefers-color-scheme: dark)',
};

function determineTheme(theme: LocalStorageTheme) {
  if (theme === 'system') {
    if (window.matchMedia(colorSchemes.dark).matches) {
      return 'dark';
    }
    return 'light';
  }
  return theme;
}

type LocalStorageTheme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [localStorageTheme, setLocalStorageTheme] = useState<LocalStorageTheme>(
    (localStorage.getItem('theme') as LocalStorageTheme) || 'system',
  );
  const [theme, setTheme] = useState(determineTheme(localStorageTheme));

  const onUpdateTheme = (theme: LocalStorageTheme) => {
    localStorage.setItem('theme', theme);
    window.dispatchEvent(
      new StorageEvent('storage', { key: 'theme', newValue: theme }),
    );
  };

  useEffect(() => {
    if (!window.matchMedia || localStorageTheme !== 'system') {
      return;
    }

    const lightMatch = window.matchMedia(colorSchemes.light);
    const onLightMatches = () => {
      if (lightMatch.matches) {
        setTheme('light');
      }
    };
    lightMatch.addEventListener('change', onLightMatches);

    const darkMatch = window.matchMedia(colorSchemes.dark);
    const onDarkMatches = () => {
      if (darkMatch.matches) {
        setTheme('dark');
      }
    };
    darkMatch.addEventListener('change', onDarkMatches);

    return () => {
      lightMatch.removeEventListener('change', onLightMatches);
      darkMatch.removeEventListener('change', onDarkMatches);
    };
  }, [localStorageTheme]);

  useEffect(() => {
    const onThemeChange = (event: StorageEvent) => {
      if (event.key === 'theme') {
        setLocalStorageTheme(event.newValue as LocalStorageTheme);
        setTheme(determineTheme(event.newValue as LocalStorageTheme));
      }
    };
    window.addEventListener('storage', onThemeChange);
    return () => {
      window.removeEventListener('storage', onThemeChange);
    };
  }, []);

  return { theme, setTheme: onUpdateTheme };
};
