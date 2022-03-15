import React, { createContext, useState, useContext } from "react";

interface IAuthContext {
  logged: boolean;
  signIn(email: string, password: string): void;
  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext); // o contextAPI necessita comecar com um estado vazio, entao colocamos o objeto como vazio

const AuthProvider: React.FC = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(() => {
    // busca no localStorage o "@minha-carteira: logged" e verifica se existe conteúdo nele
    const isLogged = localStorage.getItem("@minha-carteira:logged");

    return !!isLogged; // verifica se tem conteúdo. Se tiver: verdadeiro, se nao: falso
  });

  // funcao para logar: seta o local como true e torna estado logged como true, se não logou email ou senha invalidos
  const signIn = (email: string, password: string) => {
    if (email === "lais@email.com" && password === "123") {
      localStorage.setItem("@minha-carteira:logged", "true");
      setLogged(true);
    } else {
      alert("Senha ou usuário inválido!");
    }
  };

  // funcao para deslogar: remove o local e seta o logged como false
  const signOut = () => {
    localStorage.removeItem("@minha-carteira:logged");
    setLogged(false);
  };

  return (
    <AuthContext.Provider value={{ logged, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
