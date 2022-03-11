import React, { useMemo, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import { Container, Content, Filters } from "./style";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfMonths from "../../utils/months";

interface IRouteParams {
  match: {
    //informacoes da rota
    params: {
      // parametros da rota
      type: string; // meu type
    };
  };
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<string>(
    String(new Date().getMonth() + 1)
  );
  const [yearSelected, setYearSelected] = useState<string>(
    String(new Date().getFullYear())
  );
  const [selectedFrequency, setSelectedFrequency] = useState<string[]>([
    // "recorrente", // index === 0
    // "eventual", // index === 1
  ]); // o estado começa com os dois filtros de frequencia habilitado, ou seja, mostra os cards de recorrencia e eventual // nao tem tipagem porque o ts consegue inferir qual é pelo estado inicial (no caso, string)

  const { type } = match.params;

  const title = useMemo(() => {
    return type === "entry-balance" ? "Entradas" : "Saídas";
  }, [type]);

  const lineColor = useMemo(() => {
    return type === "entry-balance" ? "#F7931B" : "#E44C4E";
  }, [type]);

  const listData = useMemo(() => {
    return type === "entry-balance" ? gains : expenses;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // para memorizar o valor correspondente aos meses pois são sempre os mesmos
  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  // para memorizar o valor correspondente aos anos (que tem registro) que nao irao mudar muito
  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    // forEach porque nao é uma lista
    listData.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      //se o ano não estiver incluso dentro do select ainda, incluí-lo
      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    // retorna a lista de anos, exemplo: [{value: 2020, label: 2020}, {value: 2019, label: 2019}, {value: 2018, label: 2018}]
    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, [listData]);

  // quero saber se quando o usuário clicar em um estado (recorrente ou eventual) se já está selecionado
  // sendo frequency = recorrente e/ou eventual
  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = selectedFrequency.findIndex(
      // findIndex retorna o primeiro índice do array que satisfizer a condição, se não corresponder, ele retorna -1 o que significa que nenhum elemento desse array satisfaz a condição
      // no caso item === frequency: encontra qual é o índice que é igual à frequency
      (item) => item === frequency
    );

    if (alreadySelected >= 0) {
      console.log("JÁ ESTÁ SELECIONADO");
    } else {
      console.log("FREQUENCIA SELECIONADA AGORA!");
      setSelectedFrequency([frequency]);
      // setSelectedFrequency((prev) => [...prev, frequency]);
    }
  };

  useEffect(() => {
    // filtro para retornar apenas os cards com o mes e o ano que foram selecionados
    const filteredDate = listData.filter((item) => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());

      return month === monthSelected && year === yearSelected;
    });

    // percorrer cada item filtrado, ou seja, cada item que tem o mes e ano selecionados
    const formattedDate = filteredDate.map((item) => {
      return {
        id: uuidv4(), // id para gerar número único para a key do react - utilizado uma lib para isso
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4E41F0" : "#E44C4E",
      };
    });

    // colocar esses itens no estado 'data'
    setData(formattedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listData, monthSelected, yearSelected, data.length]);

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput
          options={months}
          onChange={(e) => setMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => setYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Filters>
        <button
          type="button"
          className="tag-filter tag-filter-recurrent"
          onClick={() => handleFrequencyClick("recorrente")}
        >
          Recorrentes
        </button>
        <button
          type="button"
          className="tag-filter tag-filter-eventual"
          onClick={() => handleFrequencyClick("eventual")}
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {data.map((item) => (
          <HistoryFinanceCard
            key={item.id}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dateFormatted}
            amount={item.amountFormatted}
          />
        ))}
      </Content>
    </Container>
  );
};

export default List;
