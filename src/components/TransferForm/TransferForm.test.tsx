import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TransferForm from "./TransferForm";
import userEvent from "@testing-library/user-event";

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

  describe("Integration", () => {
    it("shows validation errors if Next clicked with empty fields", async () => {
      const user = userEvent.setup();
      render(<TransferForm />);

      await user.click(screen.getByText("Next"));

      expect(screen.getByText("Your IBAN is required")).toBeInTheDocument();
      expect(
        screen.getByText("Recipient name is required")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Recipient IBAN is required")
      ).toBeInTheDocument();
      expect(screen.getByText("Bank name is required")).toBeInTheDocument();
    });

    it("goes to step 2 after valid step 1", async () => {
      const user = userEvent.setup();
      render(<TransferForm />);

      await user.type(
        screen.getByPlaceholderText("Your IBAN e.g. RO49AAAA1B31007593840000"),
        "RO49AAAA1B31007593840000"
      );
      await user.type(screen.getByPlaceholderText("John Doe"), "John Doe");
      await user.type(
        screen.getByPlaceholderText(
          "Recipient IBAN e.g. RO49AAAA1B31007593840001"
        ),
        "RO49AAAA1B31007593840001"
      );
      await user.type(
        screen.getByPlaceholderText("BCR, ING, Raiffeisen..."),
        "BCR"
      );
      await user.click(screen.getByText("Next"));

      expect(screen.getByText("Transfer Amount")).toBeInTheDocument();
    });

    it("shows Back button on step 2", async () => {
      const user = userEvent.setup();
      render(<TransferForm />);

      await user.type(
        screen.getByPlaceholderText("Your IBAN e.g. RO49AAAA1B31007593840000"),
        "RO49AAAA1B31007593840000"
      );
      await user.type(screen.getByPlaceholderText("John Doe"), "John Doe");
      await user.type(
        screen.getByPlaceholderText(
          "Recipient IBAN e.g. RO49AAAA1B31007593840001"
        ),
        "RO49AAAA1B31007593840001"
      );
      await user.type(
        screen.getByPlaceholderText("BCR, ING, Raiffeisen..."),
        "BCR"
      );
      await user.click(screen.getByText("Next"));

      expect(screen.getByText("Back")).toBeInTheDocument();
    });

    it("goes back to step 1 when Back is clicked", async () => {
      const user = userEvent.setup();
      render(<TransferForm />);

      await user.type(
        screen.getByPlaceholderText("Your IBAN e.g. RO49AAAA1B31007593840000"),
        "RO49AAAA1B31007593840000"
      );
      await user.type(screen.getByPlaceholderText("John Doe"), "John Doe");

      await user.type(
        screen.getByPlaceholderText(
          "Recipient IBAN e.g. RO49AAAA1B31007593840001"
        ),
        "RO49AAAA1B31007593840001"
      );

      await user.type(
        screen.getByPlaceholderText("BCR, ING, Raiffeisen..."),
        "BCR"
      );
      await user.click(screen.getByText("Next"));
      await user.click(screen.getByText("Back"));

      expect(screen.getByText("Transfer Details")).toBeInTheDocument();
    });

    it("shows success screen after full valid submission", async () => {
      const user = userEvent.setup();
      render(<TransferForm />);

      // Step 1
      await user.type(
        screen.getByPlaceholderText("Your IBAN e.g. RO49AAAA1B31007593840000"),
        "RO49AAAA1B31007593840000"
      );
      await user.type(screen.getByPlaceholderText("John Doe"), "John Doe");

      await user.type(
        screen.getByPlaceholderText(
          "Recipient IBAN e.g. RO49AAAA1B31007593840001"
        ),
        "RO49AAAA1B31007593840001"
      );

      await user.type(
        screen.getByPlaceholderText("BCR, ING, Raiffeisen..."),
        "BCR"
      );
      await user.click(screen.getByText("Next"));

      // Step 2
      await user.type(screen.getByPlaceholderText("0.00"), "500");
      await user.click(screen.getByText("Next"));

      // Step 3
      await user.click(screen.getByRole("checkbox"));
      await user.click(screen.getByText("Send Transfer"));

      expect(screen.getByText("Transfer Initiated!")).toBeInTheDocument();
    });
  });
});
