import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import StepAmount from "./StepAmount";
import type { TransferFormDataType, FormErrorsType } from "../../../types";
import userEvent from "@testing-library/user-event";

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

describe("StepAmount", () => {
  describe("Unit", () => {
    it("renders all fields", () => {
      render(<StepAmount formData={baseData} errors={{}} onChange={vi.fn()} />);

      expect(screen.getByLabelText("Amount")).toBeInTheDocument();
      expect(screen.getByLabelText("Currency")).toBeInTheDocument();
      expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    });

    it("renders title correctly", () => {
      render(<StepAmount formData={baseData} errors={{}} onChange={vi.fn()} />);
      expect(screen.getByText("Transfer Amount")).toBeInTheDocument();
    });

    it("renders correct currency options", () => {
      render(<StepAmount formData={baseData} errors={{}} onChange={vi.fn()} />);

      expect(screen.getByRole("option", { name: "RON" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "EUR" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "USD" })).toBeInTheDocument();
    });

    it("shows RON as default selected currency", () => {
      render(<StepAmount formData={baseData} errors={{}} onChange={vi.fn()} />);

      expect(screen.getByRole("combobox")).toHaveValue("RON");
    });

    it("shows error messages when errors are passed", () => {
      const errors: FormErrorsType = {
        amount: "Amount is required",
        currency: "Please select a currency",
      };

      render(
        <StepAmount formData={baseData} errors={errors} onChange={vi.fn()} />
      );

      expect(screen.getByText("Amount is required")).toBeInTheDocument();
      expect(screen.getByText("Please select a currency")).toBeInTheDocument();
    });

    it("renders input values from formData", () => {
      const data: TransferFormDataType = {
        ...baseData,
        amount: "500",
        currency: "EUR",
        description: "Invoice #123",
      };

      render(<StepAmount formData={data} errors={{}} onChange={vi.fn()} />);

      expect(screen.getByDisplayValue("500")).toBeInTheDocument();
      expect(screen.getByRole("combobox")).toHaveValue("EUR");
      expect(screen.getByDisplayValue("Invoice #123")).toBeInTheDocument();
    });

    it("shows optional label for description", () => {
      render(<StepAmount formData={baseData} errors={{}} onChange={vi.fn()} />);
      expect(screen.getByText("(optional)")).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("calls onChange when user types amount", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <StepAmount formData={baseData} errors={{}} onChange={handleChange} />
      );

      await user.type(screen.getByLabelText("Amount"), "100");

      expect(handleChange).toHaveBeenCalled();
    });

    it("calls onChange when user changes currency", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <StepAmount formData={baseData} errors={{}} onChange={handleChange} />
      );

      await user.selectOptions(screen.getByRole("combobox"), "EUR");

      expect(handleChange).toHaveBeenCalled();
    });

    it("applies error class to amount input when error exists", () => {
      const errors: FormErrorsType = { amount: "Amount is required" };

      render(
        <StepAmount formData={baseData} errors={errors} onChange={vi.fn()} />
      );

      expect(screen.getByLabelText("Amount")).toHaveClass(
        "transfer-form__input--error"
      );
    });
  });
});
