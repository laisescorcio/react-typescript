import styled from "styled-components";
import Switch, { ReactSwitchProps } from 'react-switch';
import ReactSwitch from "react-switch";

export const Container = styled.div`
    display: flex;
    align-items: center;
`;

export const ToggleLabel = styled.span`
    color: ${props => props.theme.colors.white}
`;

// não é um elemento, e sim uma biblio, entao usa-se styled(Biblio), 
// e attrs para mexer nos seus atributos 
// e o ReactSwitchProps para enxergar quais propriedades ele possui
export const ToggleSelector = styled(Switch).attrs<ReactSwitchProps>(
    ({ theme }) => ({
        onColor: theme.colors.info,
        offColor: theme.colors.warning
    }))<ReactSwitchProps>`
        margin: 0 7px;
    `;