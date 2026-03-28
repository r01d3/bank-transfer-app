import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TransferForm from "./TransferForm";

describe("TransferForm", () => {
  describe("Unit", () => {
    it("renders step 1 by default", () => {
      render(<TransferForm />);
      expect(screen.getByText("Transfer Details")).toBeInTheDocument();
    });

    it("renders all 3 step labels", () => {
      render(<TransferForm />);
      expect(screen.getByText("Recipient")).toBeInTheDocument();
      expect(screen.getByText("Amount")).toBeInTheDocument();
      expect(screen.getByText("Confirm")).toBeInTheDocument();
    });

    it("shows Next button on step 1", () => {
      render(<TransferForm />);
      expect(screen.getByText("Next")).toBeInTheDocument();
    });

    it("does not show Back button on step 1", () => {
      render(<TransferForm />);
      expect(screen.queryByText("Back")).not.toBeInTheDocument();
    });
  });
});
