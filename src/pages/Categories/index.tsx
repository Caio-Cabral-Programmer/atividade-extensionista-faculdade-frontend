import { useState } from "react";
import styled from "styled-components";
import { Plus, ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
} from "../../hooks/useCategories";
import { ICategory } from "../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const PageTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 24px;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 8px 20px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 0.85rem;
  font-weight: 500;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.secondary : theme.colors.background};
  color: ${({ $active }) => ($active ? "#fff" : "#6B7280")};
  transition: ${({ theme }) => theme.transitions.default};
  min-height: 44px;
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
`;

const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CategoryDot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  min-height: 44px;
  min-width: 44px;
  justify-content: center;
`;

const SubCategories = styled.div`
  padding-left: 32px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  color: ${({ theme }) => theme.colors.textMuted};
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const CategoryName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const categorySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  type: z.enum(["Income", "Expense"]),
  icon: z.string().min(1, "Ícone é obrigatório"),
  color: z.string().min(1, "Cor é obrigatória"),
  parentCategoryId: z.string().optional(),
});

export default function Categories() {
  const [activeTab, setActiveTab] = useState<"Income" | "Expense">("Expense");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: categories, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      type: activeTab,
      icon: "tag",
      color: "#2E5EA8",
      parentCategoryId: "",
    },
  });

  const filtered = (categories || []).filter(
    (c) => c.type === activeTab && !c.parentCategoryId,
  );

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCreate = form.handleSubmit((data) => {
    createCategory.mutate(
      { ...data, parentCategoryId: data.parentCategoryId || null },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          form.reset();
        },
      },
    );
  });

  const renderCategory = (category: ICategory) => (
    <div key={category.categoryId}>
      <CategoryItem>
        <CategoryInfo>
          {category.subCategories.length > 0 && (
            <ExpandButton onClick={() => toggleExpand(category.categoryId)}>
              {expanded.has(category.categoryId) ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </ExpandButton>
          )}
          <CategoryDot $color={category.color} />
          <CategoryName>{category.name}</CategoryName>
          {category.isSystem && <Badge>Padrão</Badge>}
        </CategoryInfo>
        {!category.isSystem && (
          <IconButton
            onClick={() => {
              if (window.confirm("Excluir categoria?"))
                deleteCategory.mutate(category.categoryId);
            }}
            aria-label="Excluir"
          >
            <Trash2 size={16} />
          </IconButton>
        )}
      </CategoryItem>
      {expanded.has(category.categoryId) &&
        category.subCategories.length > 0 && (
          <SubCategories>
            {category.subCategories.map((sub) => renderCategory(sub))}
          </SubCategories>
        )}
    </div>
  );

  return (
    <div>
      <PageHeader>
        <PageTitle>Categorias</PageTitle>
        <Button size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Nova Categoria
        </Button>
      </PageHeader>

      <Tabs>
        <Tab
          $active={activeTab === "Expense"}
          onClick={() => setActiveTab("Expense")}
        >
          Despesas
        </Tab>
        <Tab
          $active={activeTab === "Income"}
          onClick={() => setActiveTab("Income")}
        >
          Receitas
        </Tab>
      </Tabs>

      <Card>
        {isLoading ? (
          <Spinner />
        ) : filtered.length > 0 ? (
          filtered.map((c) => renderCategory(c))
        ) : (
          <EmptyState title="Nenhuma categoria encontrada" />
        )}
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nova Categoria"
      >
        <Form onSubmit={handleCreate}>
          <Input
            label="Nome"
            placeholder="Ex: Alimentação"
            error={form.formState.errors.name?.message}
            {...form.register("name")}
          />
          <Select
            label="Tipo"
            options={[
              { value: "Expense", label: "Despesa" },
              { value: "Income", label: "Receita" },
            ]}
            {...form.register("type")}
          />
          <Input
            label="Ícone (Lucide)"
            placeholder="Ex: utensils"
            error={form.formState.errors.icon?.message}
            {...form.register("icon")}
          />
          <Input
            label="Cor (hex)"
            placeholder="#2E5EA8"
            error={form.formState.errors.color?.message}
            {...form.register("color")}
          />
          <Button type="submit" fullWidth isLoading={createCategory.isPending}>
            Criar Categoria
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
