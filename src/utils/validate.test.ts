import { describe, it, expect } from "vitest";
import { validateStep1, validateStep2, validateStep3 } from "./validate";
import type { TransferFormDataType } from "../types";

const baseData: TransferFormDataType = {
  fromIban: "RO49AAAA1B31007593840000",
  recipientName: "John Doe",
  toIban: "RO49AAAA1B31007593840001",
  bank: "BCR",
  amount: "100",
  currency: "RON",
  description: "",
  agree: false,
};

// ───── Step 1 ─────
describe("validateStep1", () => {
  it("returns no errors for valid data", () => {
    const errors = validateStep1(baseData);
    expect(errors).toEqual({});
  });

  it("returns error if fromIban is empty", () => {
    const errors = validateStep1({ ...baseData, fromIban: "" });
    expect(errors.fromIban).toBe("Your IBAN is required");
  });

  it("returns error if fromIban format is invalid", () => {
    const errors = validateStep1({ ...baseData, fromIban: "invalid" });
    expect(errors.fromIban).toBe(
      "Invalid IBAN format (e.g. RO49AAAA1B31007593840000)"
    );
  });

  it("returns error if recipientName is too short", () => {
    const errors = validateStep1({ ...baseData, recipientName: "AB" });
    expect(errors.recipientName).toBe("Name must be at least 3 characters");
  });

  it("returns error if toIban is same as fromIban", () => {
    const errors = validateStep1({
      ...baseData,
      toIban: baseData.fromIban,
    });
    expect(errors.toIban).toBe(
      "Recipient IBAN cannot be the same as your IBAN"
    );
  });

  it("returns error if bank is empty", () => {
    const errors = validateStep1({ ...baseData, bank: "" });
    expect(errors.bank).toBe("Bank name is required");
  });
});

// ───── Step 2 ─────
describe("validateStep2", () => {
  it("returns no errors for valid data", () => {
    const errors = validateStep2(baseData);
    expect(errors).toEqual({});
  });

  it("returns error if amount is empty", () => {
    const errors = validateStep2({ ...baseData, amount: "" });
    expect(errors.amount).toBe("Amount is required");
  });

  it("returns error if amount is below minimum", () => {
    const errors = validateStep2({ ...baseData, amount: "0" });
    expect(errors.amount).toBe("Minimum amount is 1");
  });

  it("returns error if amount exceeds maximum", () => {
    const errors = validateStep2({ ...baseData, amount: "99999" });
    expect(errors.amount).toBe("Maximum amount is 50,000");
  });

  it("returns error if amount is not a number", () => {
    const errors = validateStep2({ ...baseData, amount: "abc" });
    expect(errors.amount).toBe("Amount must be a number");
  });
});

// ───── Step 3 ─────
describe("validateStep3", () => {
  it("returns error if agree is false", () => {
    const errors = validateStep3({ ...baseData, agree: false });
    expect(errors.agree).toBe("You must agree to continue");
  });

  it("returns no errors if agree is true", () => {
    const errors = validateStep3({ ...baseData, agree: true });
    expect(errors).toEqual({});
  });
});
