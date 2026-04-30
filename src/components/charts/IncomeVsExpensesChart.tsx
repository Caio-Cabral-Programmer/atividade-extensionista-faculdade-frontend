import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { IBalanceEvolution } from "../../types";
import { formatCurrency } from "../../utils/formatters";

const ChartWrapper = styled.div`
  width: 100%;
  height: 280px;
`;

interface IncomeVsExpensesChartProps {
  data: IBalanceEvolution[];
}

export function IncomeVsExpensesChart({ data }: IncomeVsExpensesChartProps) {
  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <Legend />
          <Bar
            dataKey="income"
            fill="#10B981"
            name="Receitas"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="expenses"
            fill="#EF4444"
            name="Despesas"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
