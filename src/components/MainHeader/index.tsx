import React, { useMemo, useState } from "react";

import Toggle from "../Toggle";
import emojis from "../../utils/emojis";

import { useTheme } from "../../hooks/theme";

import { Container, Profile, Welcome, UserName } from "./styles";

const MainHeader: React.FC = () => {
  const { toggleTheme, theme } = useTheme();

  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  ); // para saber se o dark está selecionado

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme); // se ta verdadeiro, troca pra falso; se falso troca pra verdadeiro
    toggleTheme(); // executa funcao de troca de tema
  };

  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length);

    return emojis[indice];
  }, []);

  return (
    <Container>
      <Toggle
        labelLeft="Light"
        labelRight="Dark"
        checked={darkTheme}
        onChange={handleChangeTheme}
      ></Toggle>

      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <UserName>Laís Escorcio Correia!</UserName>
      </Profile>
    </Container>
  );
};

export default MainHeader;
