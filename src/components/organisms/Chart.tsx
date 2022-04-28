import {
  Chart as ChartJs,
  ChartConfiguration,
  ChartDataset,
  ChartOptions,
  registerables,
} from "chart.js";
// import ChartJs from "chart.js/auto";
import React, { FunctionComponent, useEffect, useMemo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { IChartType } from "../../interfaces/chart";
interface props {
  type: IChartType;
  dataLabels: string[];
  options?: ChartOptions;
  dataSet: ChartDataset[];
  width?: string;
}

const Chart: FunctionComponent<props> = ({
  dataLabels,
  type,
  options = {},
  dataSet,
  width,
}) => {
  const chartd = useMemo(() => uuidv4(), []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ChartJs | null>();
  const chartConfig = useMemo<ChartConfiguration>(
    () => ({
      type: type,
      data: {
        labels: dataLabels,
        datasets: dataSet,
      },
      options,
    }),
    [dataLabels, dataSet, options, type]
  );

  useEffect(() => {
    ChartJs.register(...registerables);
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }
    if (canvasRef.current) {
      chartRef.current = new ChartJs(canvasRef.current, chartConfig);
    }
  }, [chartConfig]);
  return (
    <div style={{ width, height: "100%" }}>
      <canvas style={{ width: "100%" }} id={chartd} ref={canvasRef} />
    </div>
  );
};

export default Chart;
