import React, { createContext, useState, useContext } from "react";

import dark from "../styles/themes/dark";
import light from "../styles/themes/light";

// interface do contexto: com tema e função para trocar de contexto (o tema)
interface IThemeContext {
  toggleTheme(): void;
  theme: ITheme;
}

// interface das informaçoes do tema
interface ITheme {
  title: string;

  colors: {
    primary: string;
    secondary: string;
    tertiary: string;

    white: string;
    black: string;
    gray: string;

    success: string;
    info: string;
    warning: string;
  };
}

// contexto
const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

// provider
const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ITheme>(light);

  const toggleTheme = () => {
    if (theme.title === "dark") {
      setTheme(light);
    } else {
      setTheme(dark);
    }
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme(): IThemeContext {
  const context = useContext(ThemeContext);

  return context;
}

export { ThemeProvider, useTheme };
