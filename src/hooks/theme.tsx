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
  const [theme, setTheme] = useState<ITheme>(() => {
    const themeSaved = localStorage.getItem("@minha-carteira:theme");

    // se tiver esse @minha-carteira:theme no localStorage ele pega o valor que está no local Storage
    if (themeSaved) {
      return JSON.parse(themeSaved); // transformando pra JSON
    } else {
      // caso não encontre esse @minha-carteira:theme no localStorage carregar o dark por default
      return dark;
    }
  });

  // troca de tema e seta o localStorage
  const toggleTheme = () => {
    if (theme.title === "dark") {
      setTheme(light);
      localStorage.setItem("@minha-carteira:theme", JSON.stringify(light)); // para guardar no localStorage é necessário ser um texto e 'light' é um objeto
    } else {
      setTheme(dark);
      localStorage.setItem("@minha-carteira:theme", JSON.stringify(dark)); // para guardar no localStorage é necessário ser um texto e 'dark' é um objeto
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
