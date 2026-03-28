import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StepConfirm from "./StepConfirm";
import type { TransferFormDataType, FormErrorsType } from "../../../types";

const baseData: TransferFormDataType = {
  fromIban: "RO49AAAA1B31007593840000",
  recipientName: "John Doe",
  toIban: "RO49AAAA1B31007593840001",
  bank: "BCR",
  amount: "500",
  currency: "RON",
  description: "",
  agree: false,
};

describe("StepConfirm", () => {
  describe("Unit", () => {
    it("renders title correctly", () => {
      render(
        <StepConfirm formData={baseData} errors={{}} onChange={vi.fn()} />
      );
      expect(screen.getByText("Confirm Transfer")).toBeInTheDocument();
    });

    it("renders summary with correct values", () => {
      render(
        <StepConfirm formData={baseData} errors={{}} onChange={vi.fn()} />
      );

      expect(screen.getByText("RO49AAAA1B31007593840000")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("RO49AAAA1B31007593840001")).toBeInTheDocument();
      expect(screen.getByText("BCR")).toBeInTheDocument();
      expect(screen.getByText("500 RON")).toBeInTheDocument();
    });

    it("renders checkbox unchecked by default", () => {
      render(
        <StepConfirm formData={baseData} errors={{}} onChange={vi.fn()} />
      );

      expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("renders checkbox checked when agree is true", () => {
      render(
        <StepConfirm
          formData={{ ...baseData, agree: true }}
          errors={{}}
          onChange={vi.fn()}
        />
      );

      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("shows agree error when passed", () => {
      const errors: FormErrorsType = { agree: "You must agree to continue" };

      render(
        <StepConfirm formData={baseData} errors={errors} onChange={vi.fn()} />
      );

      expect(
        screen.getByText("You must agree to continue")
      ).toBeInTheDocument();
    });

    it("does not show description row when description is empty", () => {
      render(
        <StepConfirm formData={baseData} errors={{}} onChange={vi.fn()} />
      );

      expect(screen.queryByText("Description")).not.toBeInTheDocument();
    });

    it("shows description row when description has value", () => {
      const data = { ...baseData, description: "Invoice #123" };
      render(<StepConfirm formData={data} errors={{}} onChange={vi.fn()} />);

      expect(screen.getByText("Invoice #123")).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("calls onChange when checkbox is clicked", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <StepConfirm formData={baseData} errors={{}} onChange={handleChange} />
      );

      await user.click(screen.getByRole("checkbox"));

      expect(handleChange).toHaveBeenCalled();
    });
  });
});
