import React from 'react';

import SelectInput from '../../components/SelectInput';

import { 
    Container,
    TitleContainer,
    Controllers
} from './styles';

const ContentHeader: React.FC = () => {

    const options = [
        { value: "Rodrigo", label: "Rodrigo" },
        { value: "Maria", label: "Maria" },
        { value: "Ana", label: "Ana" },
    ]

    return (
        <Container>
            <TitleContainer>
                <h1>Título</h1>
            </TitleContainer>
            <Controllers>
                <SelectInput options={options}/>
            </Controllers>
        </Container>
    )
}

export default ContentHeader;