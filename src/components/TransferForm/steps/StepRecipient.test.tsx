import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import StepRecipient from "./StepRecipient";
import type { TransferFormDataType, FormErrorsType } from "../../../types";

const baseData: TransferFormDataType = {
  fromIban: "",
  recipientName: "",
  toIban: "",
  bank: "",
  amount: "",
  currency: "RON",
  description: "",
  agree: false,
};

describe("StepRecipient", () => {
  describe("Unit", () => {
    it("renders all fields", () => {
      render(
        <StepRecipient formData={baseData} errors={{}} onChange={vi.fn()} />
      );

      expect(screen.getByLabelText("Your IBAN")).toBeInTheDocument();
      expect(screen.getByLabelText("Recipient Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Recipient IBAN")).toBeInTheDocument();
      expect(screen.getByLabelText("Recipient Bank")).toBeInTheDocument();
    });

    it("renders title correctly", () => {
      render(
        <StepRecipient formData={baseData} errors={{}} onChange={vi.fn()} />
      );
      expect(screen.getByText("Transfer Details")).toBeInTheDocument();
    });

    it("shows error messages when errors are passed", () => {
      const errors: FormErrorsType = {
        fromIban: "Your IBAN is required",
        recipientName: "Recipient name is required",
        toIban: "Recipient IBAN is required",
        bank: "Bank name is required",
      };

      render(
        <StepRecipient formData={baseData} errors={errors} onChange={vi.fn()} />
      );

      expect(screen.getByText("Your IBAN is required")).toBeInTheDocument();
      expect(
        screen.getByText("Recipient name is required")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Recipient IBAN is required")
      ).toBeInTheDocument();
      expect(screen.getByText("Bank name is required")).toBeInTheDocument();
    });

    it("does not show errors when errors are empty", () => {
      render(
        <StepRecipient formData={baseData} errors={{}} onChange={vi.fn()} />
      );

      expect(
        screen.queryByText("Your IBAN is required")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Recipient name is required")
      ).not.toBeInTheDocument();
    });

    it("renders input values from formData", () => {
      const data: TransferFormDataType = {
        ...baseData,
        recipientName: "John Doe",
        bank: "BCR",
      };

      render(<StepRecipient formData={data} errors={{}} onChange={vi.fn()} />);

      expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
      expect(screen.getByDisplayValue("BCR")).toBeInTheDocument();
    });
  });
});
