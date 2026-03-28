import { useState } from "react";
import type { TransferFormDataType, FormErrorsType } from "../../types";
import {
  validateStep1,
  validateStep2,
  validateStep3,
} from "../../utils/validate";
import { StepAmount, StepConfirm, StepRecipient } from "./steps";
import "./TransferForm.scss";

const STEPS = ["Recipient", "Amount", "Confirm"];

const initialData: TransferFormDataType = {
  fromIban: "",
  recipientName: "",
  toIban: "",
  bank: "",
  amount: "",
  currency: "RON",
  description: "",
  agree: false,
};

const TransferForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<TransferFormDataType>(initialData);
  const [errors, setErrors] = useState<FormErrorsType>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateCurrentStep = (): boolean => {
    let stepErrors: FormErrorsType = {};

    if (currentStep === 0) stepErrors = validateStep1(formData);
    if (currentStep === 1) stepErrors = validateStep2(formData);
    if (currentStep === 2) stepErrors = validateStep3(formData);

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      console.log("Transfer submitted:", formData);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="transfer-form transfer-form--success">
        <div className="transfer-form__success-icon">✓</div>
        <h2 className="transfer-form__success-title">Transfer Initiated!</h2>
        <p className="transfer-form__success-text">
          Your transfer has been submitted successfully.
        </p>
      </div>
    );
  }

  return (
    <div className="transfer-form">
      {/* Stepper */}
      <div className="transfer-form__stepper">
        {STEPS.map((step, index) => (
          <div
            key={step}
            className={[
              "transfer-form__step",
              index === currentStep ? "transfer-form__step--active" : "",
              index < currentStep ? "transfer-form__step--done" : "",
            ].join(" ")}
          >
            <div className="transfer-form__step-circle">
              {index < currentStep ? "✓" : index + 1}
            </div>
            <span className="transfer-form__step-label">{step}</span>
          </div>
        ))}
        <div className="transfer-form__step-line" />
      </div>

      {/* Steps */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="transfer-form__body">
          {currentStep === 0 && (
            <StepRecipient
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          )}
          {currentStep === 1 && (
            <StepAmount
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          )}
          {currentStep === 2 && (
            <StepConfirm
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="transfer-form__nav">
          {currentStep > 0 && (
            <button
              type="button"
              className="transfer-form__btn transfer-form__btn--back"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              className="transfer-form__btn transfer-form__btn--next"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="transfer-form__btn transfer-form__btn--submit"
            >
              Send Transfer
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TransferForm;
