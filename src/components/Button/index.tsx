import React, { ButtonHTMLAttributes } from "react";

import { Container } from "./styles";

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; // a interface recebe os atributos de um Button html

// stateless component: componente sem estado, não precisa de 'return {}'
const Button: React.FC<IButtonProps> = ({
  children,
  ...rest // para exportar todos os atributos do Button HTML
}) => <Container {...rest}>{children}</Container>;

export default Button;
