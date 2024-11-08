import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type Theme = 'dark' | 'light';

interface IThemeContext {
  theme: Theme;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

const initialContext = {
  theme: 'light' as Theme,
  setDarkTheme: () => undefined,
  setLightTheme: () => undefined,
};

export const ThemeContext = createContext<IThemeContext>(initialContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  const setDarkTheme = () => {
    setTheme('dark');
  };

  const setLightTheme = () => {
    setTheme('light');
  };

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setDarkTheme,
    setLightTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext) as IThemeContext;

export { ThemeProvider, useTheme };
