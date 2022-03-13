import React from "react";

import { Container } from "./styles";

interface IMessageBoxProps {
  title: string;
  description: string;
  footerText: string;
  icon: string;
}

// stateless component: componente sem estado, não precisa de 'return {}'
const MessageBox: React.FC<IMessageBoxProps> = ({
  title,
  description,
  footerText,
  icon,
}) => (
  <Container>
    <header>
      <h1>
        {title}
        <img src={icon} alt={title} />
      </h1>
      <p>{description}</p>
    </header>
    <footer>
      <span>{footerText}</span>
    </footer>
  </Container>
);

export default MessageBox;
