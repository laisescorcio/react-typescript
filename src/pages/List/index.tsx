import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import Content from '../../components/Content';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import { Container } from './style'

const List: React.FC = () => {
    const options = [
        { value: "Rodrigo", label: "Rodrigo" },
        { value: "Maria", label: "Maria" },
        { value: "Ana", label: "Ana" },
    ];

    return (
        <Container>
            <ContentHeader title="Saídas" lineColor="#E44C4E">
                <SelectInput options={options} />
            </ContentHeader>
            <Content>
                <HistoryFinanceCard 
                    cardColor='#313862' 
                    tagColor='#E44C4E' 
                    title='Conta de Luz' 
                    subtitle='31/07/2020'
                    amount='R$ 130,00'
                    />
            </Content>
        </Container>
    )
}

export default List;