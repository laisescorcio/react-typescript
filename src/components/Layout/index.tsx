import React from "react";
import { Grid } from "./styles";

import MainHeader from "../MainHeader";
import Aside from "../Aside";
import Content from "../Content";

// stateless component: componente sem estado, não precisa de 'return {}'
const Layout: React.FC = ({ children }) => (
  <Grid>
    <MainHeader />
    <Aside />
    <Content>{children}</Content>
  </Grid>
);

export default Layout;
