import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { chartTypes, IChartType } from "../interfaces/chart";
import RadioButton from "./atoms/RadioButton";
import Stack from "./atoms/Stack";
import Chart from "./organisms/Chart";

const MyChartComponent: FunctionComponent = () => {
  const [chartType, setChartType] = useState<IChartType>("bar");
  const [chartOptions, setChartOptions] = useState<{
    labels: string;
    data: string;
  }>({
    labels: "January,February,March,April,May,June,July",
    data: "0,10,5,2,20,30,45",
  });
  const label = "Just a test chart!";
  const borderColor = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];
  const backgroundColor = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];

  const blurHandler = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const state = event.target.name === "labels" ? "labels" : "data";
    const newValue = event.target.value;
    if (chartOptions[state] !== newValue) {
      onSubmit(state, newValue);
    }
  };

  const onSubmit = (state: string, newValue: string) => {
    const controlledState = state === "labels" ? "labels" : "data";
    if (chartOptions[controlledState] !== newValue) {
      setChartOptions({ ...chartOptions, [controlledState]: newValue });
    }
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.code);
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      console.log(e.currentTarget.value);
      onSubmit(e.currentTarget.name, e.currentTarget.value);
    }
  };

  return (
    <StyledStack>
      <InputContainer>
        <InputTitle>X axis labels:</InputTitle>
        <Input
          name="labels"
          defaultValue={chartOptions.labels}
          onBlur={blurHandler}
          onKeyUp={onEnter}
        />
        <InputTitle>Y axis labels:</InputTitle>
        <Input
          name="data"
          defaultValue={chartOptions.data}
          onBlur={blurHandler}
          onKeyUp={onEnter}
        />
      </InputContainer>
      <Chart
        type={chartType}
        dataLabels={chartOptions.labels.split(",")}
        width="100%"
        dataSet={[
          {
            data: chartOptions.data.split(",").map((x) => Number(x)),
            label,
            backgroundColor,
            borderColor,
          },
        ]}
      />
      <RadiosContainer>
        <h4>Select chart type:</h4>
        {chartTypes.map((type) => (
          <RadioButton
            label={type}
            name="charType"
            key={type}
            value={type}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setChartType(e.currentTarget.value as IChartType)
            }
            checked={type === chartType}
          />
        ))}
      </RadiosContainer>
    </StyledStack>
  );
};

const InputTitle = styled.p`
  flex-shrink: 0;
`;

const InputContainer = styled(Stack)`
  width: 100%;
  @media (min-width: 1000px) {
    flex-direction: row;
    justify-content: space-between;
    & :nth-child(2n-1) {
      margin-left: 10px;
    }
  }
`;

const StyledStack = styled(Stack)`
  padding: 24px;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 12px;
  width: 100%;
  max-width: 400px;
`;

const RadiosContainer = styled(Stack)`
  & :not(:last-child) {
    margin-bottom: 8px;
  }
`;

export default MyChartComponent;
