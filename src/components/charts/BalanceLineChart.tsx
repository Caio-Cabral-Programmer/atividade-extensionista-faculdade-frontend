import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { IBalanceEvolution } from "../../types";
import { formatCurrency } from "../../utils/formatters";

const ChartWrapper = styled.div`
  width: 100%;
  height: 280px;
`;

interface BalanceLineChartProps {
  data: IBalanceEvolution[];
}

export function BalanceLineChart({ data }: BalanceLineChartProps) {
  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="monthName"
            tick={{ fontSize: 11 }}
            tickFormatter={(value: string) => value.slice(0, 3)}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            tickFormatter={(value) => `R$${(Number(value) / 1000).toFixed(0)}k`}
          />
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          <Line
            type="monotone"
            dataKey="netBalance"
            stroke="#2E5EA8"
            strokeWidth={2}
            dot={{ r: 3 }}
            name="Saldo"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
