import React, { useState, useMemo } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

import expenses from "../../repositories/expenses";
import gains from "../../repositories/gains";
import listOfMonths from "../../utils/months"; // lista de todos os meses do ano

import { Container } from "./styles";

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

  const options = [
    { value: "Rodrigo", label: "Rodrigo" },
    { value: "Maria", label: "Maria" },
    { value: "Ana", label: "Ana" },
  ];

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
    [...expenses, ...gains].forEach((item) => {
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
  }, []);

  // quero saber se quando o usuário clicar em um estado (recorrente ou eventual) se já está selecionado
  // sendo frequency = recorrente e/ou eventual
  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      throw new Error("invalid month value. Is accept 0 - 11.");
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (error) {
      throw new Error("invalid month value. Is accept intereger number.");
    }
  };

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#F7931B">
        <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>
    </Container>
  );
};

export default Dashboard;
