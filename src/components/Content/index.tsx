import React from "react";
import { Container } from "./styles";

// stateless component: componente sem estado, não precisa de 'return {}'
const Content: React.FC = ({ children }) => <Container>{children}</Container>;

export default Content;
