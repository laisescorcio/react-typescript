import React, { useState, useMemo } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";
import PieChartBox from "../../components/PieChartBox";
import HistoryBox from "../../components/HistoryBox";
import BarChartBox from "../../components/BarChartBox";

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

  // valores de entrada e saída de cada mes para o gráfico cartesiano
  const historyData = useMemo(() => {
    return (
      listOfMonths
        .map((_, month) => {
          // sendo '_' o parametro 'valor' que não será usado; e o 'month' é o parametro index do map

          let amountEntry = 0;
          gains.forEach((gain) => {
            // percorre todos os itens dos ganhos
            const date = new Date(gain.date);
            const gainMonth = date.getMonth();
            const gainYear = date.getFullYear();

            if (gainMonth === month && gainYear === yearSelected) {
              // se o item for do mes que está percorrendo & tiver o mesmo ano que foi selecionado no input
              try {
                amountEntry += Number(gain.amount); // soma os valores dos novos itens percorridos aos valores anteriores
              } catch {
                throw new Error(
                  "amountEntry is invalid. amountEntry must be a valid number."
                );
              }
            }
          });

          let amountOutput = 0;
          expenses.forEach((expense) => {
            // percorre todos os itens dos ganhos
            const date = new Date(expense.date);
            const expenseMonth = date.getMonth();
            const expenseYear = date.getFullYear();

            if (expenseMonth === month && expenseYear === yearSelected) {
              // se o item for do mes que está percorrendo & tiver o mesmo ano que foi selecionado no input
              try {
                amountOutput += Number(expense.amount); // soma os valores dos novos itens percorridos aos valores anteriores
              } catch {
                throw new Error(
                  "amountOutput is invalid. amountOutput must be a valid number."
                );
              }
            }
          });

          return {
            monthNumber: month,
            month: listOfMonths[month].substring(0, 3),
            amountEntry,
            amountOutput,
          };
        })
        // para mostrar apenas os meses que tem registros
        .filter((item) => {
          const currentMonth = new Date().getMonth(); // mes atual
          const currentYear = new Date().getFullYear(); // ano atual

          // mostrar apenas o mes atual ou meses anteriores no gráfico cartesiano
          return (
            (yearSelected === currentYear && // se o ano selecionado for igual ao ano atual &
              item.monthNumber <= currentMonth) || // se o mes do item for menor ou igual ao mes atual OU
            yearSelected < currentYear // se o ano selecionado for menor ao ano atual
          );
        })
    );
  }, [yearSelected]);

  // relação percentual entre GASTOS recorrentes e eventuais para o gráfico em barras
  const relationsExpensesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected; // retorna os itens que tem o mes & o ano que estão selecionados
      })
      .forEach((expense) => {
        // para cada item filtrado acima, somar os valores dos gastos recorrentes
        if (expense.frequency === "recorrente") {
          return (amountRecurrent += Number(expense.amount));
        }

        // para cada item filtrado acima, somar os valores dos gastos eventuais
        if (expense.frequency === "eventual") {
          return (amountEventual += Number(expense.amount));
        }
      });

    const total = amountRecurrent + amountEventual;

    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: Number(((amountRecurrent / total) * 100).toFixed(1)), // porcentagem do recorrente com 1 casa decimal
        color: "#F7931B",
      },
      {
        name: "Eventuais",
        amount: amountEventual,
        percent: Number(((amountEventual / total) * 100).toFixed(1)), // porcentagem do eventual com 1 casa decimal
        color: "#E44C4E",
      },
    ];
  }, [monthSelected, yearSelected]);

  // relação percentual entre GANHOS recorrentes e eventuais para o gráfico em barras
  const relationsGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
      .filter((gain) => {
        const date = new Date(gain.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected; // retorna os itens que tem o mes & o ano que estão selecionados
      })
      .forEach((gain) => {
        // para cada item filtrado acima, somar os valores dos gastos recorrentes
        if (gain.frequency === "recorrente") {
          return (amountRecurrent += Number(gain.amount));
        }

        // para cada item filtrado acima, somar os valores dos gastos eventuais
        if (gain.frequency === "eventual") {
          return (amountEventual += Number(gain.amount));
        }
      });

    const total = amountRecurrent + amountEventual;

    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: Number(((amountRecurrent / total) * 100).toFixed(1)), // porcentagem do recorrente com 1 casa decimal
        color: "#F7931B",
      },
      {
        name: "Eventuais",
        amount: amountEventual,
        percent: Number(((amountEventual / total) * 100).toFixed(1)), // porcentagem do eventual com 1 casa decimal
        color: "#E44C4E",
      },
    ];
  }, [monthSelected, yearSelected]);

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
        <HistoryBox
          data={historyData}
          lineColorAmountEntry="#F7931B"
          lineColorAmountOutput="#E44C4E"
        />
        <BarChartBox
          title="Saídas"
          data={relationsExpensesRecurrentVersusEventual}
        />
        <BarChartBox
          title="Entradas"
          data={relationsGainsRecurrentVersusEventual}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
