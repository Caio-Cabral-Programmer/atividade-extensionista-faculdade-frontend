export type CategoryType = "Income" | "Expense";

export interface ICategory {
  categoryId: string;
  name: string;
  type: CategoryType;
  typeName: string;
  icon: string;
  color: string;
  isSystem: boolean;
  parentCategoryId: string | null;
  parentCategoryName: string | null;
  subCategories: ICategory[];
}

export interface ICreateCategoryRequest {
  name: string;
  type: CategoryType;
  icon: string;
  color: string;
  parentCategoryId: string | null;
}

export interface IUpdateCategoryRequest {
  name: string;
  icon: string;
  color: string;
}
