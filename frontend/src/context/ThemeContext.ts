import { createContext } from "react";

interface IThemeContext {
  isDarkMode: boolean | undefined;
  toggleDarkMode(): void;
}

export const ThemeContext = createContext<IThemeContext>({
  isDarkMode: undefined,
  toggleDarkMode: () => {},
});
