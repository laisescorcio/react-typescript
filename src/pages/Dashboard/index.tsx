import React, { useState, useMemo } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";
import PieChartBox from "../../components/PieChartBox";

import expenses from "../../repositories/expenses";
import gains from "../../repositories/gains";
import listOfMonths from "../../utils/months"; // lista de todos os meses do ano

import happyImg from "../../assets/happy.svg";
import sadImg from "../../assets/sad.svg";
import grinning from "../../assets/grinning.svg";

import { Container, Content } from "./styles";

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

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

  // VALORES TOTAIS DE SAÍDA
  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear(); // ano do registro
      const month = date.getMonth() + 1; // mes do registro

      // pega os registros do mes e ano selecionados e soma os valores de cada registro
      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount); // soma o valor ja guardado com o valor do novo item
        } catch {
          throw new Error("Invalid amount! Amount must be number."); // caso tenha algum registro escrito errado
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  // VALORES TOTAIS DE ENTRADA
  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear(); // ano do registro
      const month = date.getMonth() + 1; // mes do registro

      // pega os registros do mes e ano selecionados e soma os valores de cada registro
      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount); // soma o valor ja guardado com o valor do novo item
        } catch {
          throw new Error("Invalid amount! Amount must be number."); // caso tenha algum registro escrito errado
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  // OBSERVAÇÃO: Não tornamos o totalExpenses e o totalGains em uma única funcao apenas passando os parametros, para caso mude as regras de negócio
  // no SOLID: Princípio da responsabilidade única

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que triste!",
        description: "Neste mês você gastou mais do que deveria.",
        footerText:
          "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
        icon: sadImg,
      };
    } else if (totalBalance === 0) {
      return {
        title: "Ufaa!",
        description: "Neste mês você gastou exatamente o que ganhou.",
        footerText:
          "Tenha cuidado. No próximo mês tente poupar o seu dinheiro.",
        icon: grinning,
      };
    } else {
      return {
        title: "Muito bem!",
        description: "Sua carteira está positiva!",
        footerText: "Continue assim. Considere investir seu dinheiro!",
        icon: happyImg,
      };
    }
  }, [totalBalance]);

  // cálculo das porcentagens entre ganho e gastos
  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = (totalGains / total) * 100; // cálculo de porcentagem de ganhos
    const percentExpenses = (totalExpenses / total) * 100; // cálculo de porcentagem de gastos

    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: Number(percentGains.toFixed(1)),
        color: "#E44C4E",
      },
      {
        name: "Saídas",
        value: totalExpenses,
        percent: Number(percentExpenses.toFixed(1)),
        color: "#F7931B",
      },
    ];

    return data;
  }, [totalGains, totalExpenses]);

  // quero saber se quando o usuário clicar em um estado (recorrente ou eventual) se já está selecionado
  // sendo frequency = recorrente e/ou eventual
  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch {
      throw new Error("invalid month value. Is accept 0 - 11.");
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch {
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
      <Content>
        <WalletBox
          title="saldo"
          color="#4E41F0"
          amount={totalBalance}
          footerLabel="atualizado com base nas entradas e saídas"
          icon="dolar"
        />
        <WalletBox
          title="entradas"
          color="#F7931B"
          amount={totalGains}
          footerLabel="atualizado com base nas entradas e saídas"
          icon="arrowUp"
        />
        <WalletBox
          title="saídas"
          color="#E44C4E"
          amount={totalExpenses}
          footerLabel="atualizado com base nas entradas e saídas"
          icon="arrowDown"
        />
        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />{" "}
        <PieChartBox data={relationExpensesVersusGains} />
      </Content>
    </Container>
  );
};

export default Dashboard;
