import styled from "styled-components";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import { ExpensesPieChart } from "../../components/charts/ExpensesPieChart";
import { BalanceLineChart } from "../../components/charts/BalanceLineChart";
import { IncomeVsExpensesChart } from "../../components/charts/IncomeVsExpensesChart";
import {
  useDashboardSummary,
  useExpensesByCategory,
  useBalanceEvolution,
  useBalanceProjection,
} from "../../hooks/useDashboard";
import { formatCurrency } from "../../utils/formatters";

const PageTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 32px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SummaryCard = styled(Card)`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const IconBox = styled.div<{ $color: string }>`
  background-color: ${({ $color }) => `${$color}15`};
  color: ${({ $color }) => $color};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CardLabel = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const CardValue = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ChartCard = styled(Card)`
  overflow: hidden;
`;

const ChartTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.primary};
`;

const ProjectionCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const ProjectionValue = styled.span<{ $positive: boolean }>`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ $positive, theme }) =>
    $positive ? theme.colors.success : theme.colors.danger};
`;

export default function Dashboard() {
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: expensesByCategory, isLoading: expensesLoading } =
    useExpensesByCategory();
  const { data: balanceEvolution, isLoading: evolutionLoading } =
    useBalanceEvolution();
  const { data: projection, isLoading: projectionLoading } =
    useBalanceProjection();

  if (summaryLoading) return <Spinner size="lg" />;

  return (
    <div>
      <PageTitle>Dashboard</PageTitle>

      <SummaryGrid>
        <SummaryCard>
          <IconBox $color="#2E5EA8">
            <DollarSign size={22} />
          </IconBox>
          <CardContent>
            <CardLabel>Saldo Atual</CardLabel>
            <CardValue>
              {summary ? formatCurrency(summary.totalBalance) : "—"}
            </CardValue>
          </CardContent>
        </SummaryCard>
        <SummaryCard>
          <IconBox $color="#10B981">
            <TrendingUp size={22} />
          </IconBox>
          <CardContent>
            <CardLabel>Receitas do Mês</CardLabel>
            <CardValue>
              {summary ? formatCurrency(summary.monthIncome) : "—"}
            </CardValue>
          </CardContent>
        </SummaryCard>
        <SummaryCard>
          <IconBox $color="#EF4444">
            <TrendingDown size={22} />
          </IconBox>
          <CardContent>
            <CardLabel>Despesas do Mês</CardLabel>
            <CardValue>
              {summary ? formatCurrency(summary.monthExpenses) : "—"}
            </CardValue>
          </CardContent>
        </SummaryCard>
        <SummaryCard>
          <IconBox $color="#F59E0B">
            <AlertCircle size={22} />
          </IconBox>
          <CardContent>
            <CardLabel>Contas próximos 7 dias</CardLabel>
            <CardValue>
              {summary ? formatCurrency(summary.billsDueNext7Days) : "—"}
            </CardValue>
          </CardContent>
        </SummaryCard>
      </SummaryGrid>

      <ChartsGrid>
        <ChartCard>
          <ChartTitle>Despesas por Categoria</ChartTitle>
          {expensesLoading ? (
            <Spinner />
          ) : expensesByCategory && expensesByCategory.length > 0 ? (
            <ExpensesPieChart data={expensesByCategory} />
          ) : (
            <EmptyState title="Sem despesas no período" />
          )}
        </ChartCard>
        <ChartCard>
          <ChartTitle>Evolução do Saldo</ChartTitle>
          {evolutionLoading ? (
            <Spinner />
          ) : balanceEvolution && balanceEvolution.length > 0 ? (
            <BalanceLineChart data={balanceEvolution} />
          ) : (
            <EmptyState title="Sem dados disponíveis" />
          )}
        </ChartCard>
        <ChartCard>
          <ChartTitle>Receitas vs Despesas</ChartTitle>
          {evolutionLoading ? (
            <Spinner />
          ) : balanceEvolution && balanceEvolution.length > 0 ? (
            <IncomeVsExpensesChart data={balanceEvolution} />
          ) : (
            <EmptyState title="Sem dados disponíveis" />
          )}
        </ChartCard>
        <ChartCard>
          <ChartTitle>Projeção de Saldo</ChartTitle>
          {projectionLoading ? (
            <Spinner />
          ) : projection ? (
            <ProjectionCard>
              <CardContent>
                <CardLabel>Saldo Atual</CardLabel>
                <CardValue>
                  {formatCurrency(projection.currentBalance)}
                </CardValue>
              </CardContent>
              <ArrowRight size={24} color="#6B7280" />
              <CardContent>
                <CardLabel>Projeção Fim do Mês</CardLabel>
                <ProjectionValue $positive={projection.projectedBalance >= 0}>
                  {formatCurrency(projection.projectedBalance)}
                </ProjectionValue>
              </CardContent>
            </ProjectionCard>
          ) : (
            <EmptyState title="Sem dados disponíveis" />
          )}
        </ChartCard>
      </ChartsGrid>
    </div>
  );
}
