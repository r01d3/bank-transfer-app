import type { TransferFormDataType, FormErrorsType } from "../types";

const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;

export function validateStep1(data: TransferFormDataType): FormErrorsType {
  const errors: FormErrorsType = {};

  if (!data.fromIban.trim()) {
    errors.fromIban = "Your IBAN is required";
  } else if (!ibanRegex.test(data.fromIban.trim())) {
    errors.fromIban = "Invalid IBAN format (e.g. RO49AAAA1B31007593840000)";
  }

  if (!data.recipientName.trim()) {
    errors.recipientName = "Recipient name is required";
  } else if (data.recipientName.trim().length < 3) {
    errors.recipientName = "Name must be at least 3 characters";
  }

  if (!data.toIban.trim()) {
    errors.toIban = "Recipient IBAN is required";
  } else if (!ibanRegex.test(data.toIban.trim())) {
    errors.toIban = "Invalid IBAN format (e.g. RO49AAAA1B31007593840000)";
  } else if (data.fromIban.trim() === data.toIban.trim()) {
    errors.toIban = "Recipient IBAN cannot be the same as your IBAN";
  }

  if (!data.bank.trim()) {
    errors.bank = "Bank name is required";
  }

  return errors;
}

export function validateStep2(data: TransferFormDataType): FormErrorsType {
  const errors: FormErrorsType = {};

  if (!data.amount) {
    errors.amount = "Amount is required";
  } else if (isNaN(Number(data.amount))) {
    errors.amount = "Amount must be a number";
  } else if (Number(data.amount) < 1) {
    errors.amount = "Minimum amount is 1";
  } else if (Number(data.amount) > 50000) {
    errors.amount = "Maximum amount is 50,000";
  }

  if (!data.currency) {
    errors.currency = "Please select a currency";
  }

  return errors;
}

export function validateStep3(data: TransferFormDataType): FormErrorsType {
  const errors: FormErrorsType = {};

  if (!data.agree) {
    errors.agree = "You must agree to continue";
  }

  return errors;
}
