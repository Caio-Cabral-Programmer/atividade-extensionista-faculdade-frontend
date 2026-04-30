import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import styled from "styled-components";
import { IExpenseByCategory } from "../../types";
import { formatCurrency } from "../../utils/formatters";

const ChartWrapper = styled.div`
  width: 100%;
  height: 280px;
`;

interface ExpensesPieChartProps {
  data: IExpenseByCategory[];
}

export function ExpensesPieChart({ data }: ExpensesPieChartProps) {
  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="totalAmount"
            nameKey="categoryName"
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={50}
          >
            {data.map((entry) => (
              <Cell key={entry.categoryId} fill={entry.categoryColor} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            formatter={(value: string) => (
              <span style={{ fontSize: "0.8rem" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
