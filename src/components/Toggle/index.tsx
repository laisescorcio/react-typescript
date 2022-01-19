import React, { useState } from "react";

import Switch from 'react-switch';

import { 
    Container,
    ToggleLabel
} from "./styles";

const Toggle: React.FC = () => {
    const [ online, setOnline ] = useState<boolean>(true)

    return ( 
        <Container>
            <ToggleLabel>Light</ToggleLabel>
            <Switch 
                checked={online}
                onChange={() => setOnline(!online)}
                uncheckedIcon={false}
                checkedIcon={false}
            />
            <ToggleLabel>Dark</ToggleLabel>
        </Container>
    )
}

export default Toggle