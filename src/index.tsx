import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "./hooks/theme";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    {/* só consigo acessar o valor de um contexto (no caso, o tema) se envolver com o Provider */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
