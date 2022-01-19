import styled from "styled-components";

/* 
    Layout
    MH = MainHeader 
    AS = Aside
    CT = Content
*/

export const Container = styled.div`
    grid-area: AS;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.secondary};
`;