export interface TransferFormDataType {
  fromIban: string;
  recipientName: string;
  toIban: string;
  bank: string;
  amount: string;
  currency: "RON" | "EUR" | "USD";
  description: string;
  agree: boolean;
}

export interface FormErrorsType {
  fromIban?: string;
  recipientName?: string;
  toIban?: string;
  bank?: string;
  amount?: string;
  currency?: string;
  description?: string;
  agree?: string;
}

export type StepFieldsType = keyof TransferFormDataType;
