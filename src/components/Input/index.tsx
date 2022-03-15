import React, { InputHTMLAttributes } from "react";

import { Container } from "./styles";

type IInputProps = InputHTMLAttributes<HTMLInputElement>; // a interface recebe os atributos de um input html

// stateless component: componente sem estado, não precisa de 'return {}'
const Input: React.FC<IInputProps> = ({
  ...rest // para exportar todos os atributos do input HTML
}) => <Container {...rest} />;

export default Input;
