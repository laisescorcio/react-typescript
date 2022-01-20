import React from 'react';

import SelectInput from '../../components/SelectInput';

import { 
    Container,
    TitleContainer,
    Controllers
} from './styles';

const ContentHeader: React.FC = () => {
    return (
        <Container>
            <TitleContainer>
                <h1>Título</h1>
            </TitleContainer>
            <Controllers>
                <SelectInput />
                <SelectInput />
                <SelectInput />
            </Controllers>
        </Container>
    )
}

export default ContentHeader;