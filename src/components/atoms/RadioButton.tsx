import React, { FunctionComponent, useMemo } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import Stack from "./Stack";
interface Props {
  name?: string;
  value?: string;
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: FunctionComponent<Props> = ({
  name,
  onChange,
  value,
  label,
  checked,
}) => {
  const id = useMemo(() => uuid(), []);
  return (
    <StyledStack>
      <input
        checked={checked}
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </StyledStack>
  );
};

const StyledStack = styled(Stack)`
  flex-direction: row;
  align-items: center;
`;

export default RadioButton;
