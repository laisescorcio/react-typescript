import React, { useMemo } from 'react';

import Toggle from '../Toggle'
import emojis from '../../utils/emojis';

import { 
    Container, 
    Profile, 
    Welcome, 
    UserName 
} from './styles';

const MainHeader: React.FC = () => {
    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * emojis.length)

        return emojis[indice];
    }, [])

    return (
        <Container>
            <Toggle></Toggle>

            <Profile>
                <Welcome>Olá, {emoji}</Welcome>
                <UserName>Laís Escorcio Correia!</UserName>
            </Profile>
        </Container>
    )
}

export default MainHeader;