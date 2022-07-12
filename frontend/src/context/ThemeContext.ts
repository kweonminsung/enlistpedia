import { createContext } from 'react';

interface IThemeContext {
  isDarkMode: boolean;
  toggleDarkMode(): void;
}

export const ThemeContext = createContext<IThemeContext>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});
