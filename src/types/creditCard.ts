export interface ICreditCard {
  creditCardId: string;
  name: string;
  creditLimit: number;
  currentInvoiceTotal: number;
  availableLimit: number;
  closingDay: number;
  dueDay: number;
  color: string;
  isActive: boolean;
  createdAt: string;
}

export interface ICreateCreditCardRequest {
  name: string;
  creditLimit: number;
  closingDay: number;
  dueDay: number;
  color: string;
}

export interface IUpdateCreditCardRequest {
  name: string;
  creditLimit: number;
  closingDay: number;
  dueDay: number;
  color: string;
  isActive: boolean;
}
