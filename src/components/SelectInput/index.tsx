import React from "react";

import { Container } from "./styles";

interface ISelectInputProps {
  options: {
    value: string | number;
    label: string | number;
  }[]; //o [] é para significar que é uma listagem
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
  // ChangeEvent: evento ao mudar
  // HTML Select Element: pega o elemento que está selecionado
  defaultValue?: string | number; // o ? é porque é opcional, ou seja, algumas listas podem ter valores padrões outras não, não é obrigatório usar essa prop
}

const SelectInput: React.FC<ISelectInputProps> = ({
  options,
  onChange,
  defaultValue,
}) => {
  return (
    <Container>
      <select onChange={onChange} defaultValue={defaultValue}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default SelectInput;
