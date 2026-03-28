import type { TransferFormDataType, FormErrorsType } from "../../../types";

interface StepConfirmPropsType {
  formData: TransferFormDataType;
  errors: FormErrorsType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StepConfirm = ({ formData, errors, onChange }: StepConfirmPropsType) => {
  return (
    <div className="transfer-form__fields">
      <h2 className="transfer-form__title">Confirm Transfer</h2>

      <div className="transfer-form__summary">
        <div className="transfer-form__summary-row">
          <span className="transfer-form__summary-label">Recipient</span>
          <span className="transfer-form__summary-value">
            {formData.recipientName}
          </span>
        </div>
        <div className="transfer-form__summary-row">
          <span className="transfer-form__summary-label">From</span>
          <span className="transfer-form__summary-value">
            {formData.fromIban}
          </span>
        </div>
        <div className="transfer-form__summary-row">
          <span className="transfer-form__summary-label">To</span>
          <span className="transfer-form__summary-value">
            {formData.toIban}
          </span>
        </div>
        <div className="transfer-form__summary-row">
          <span className="transfer-form__summary-label">Bank</span>
          <span className="transfer-form__summary-value">{formData.bank}</span>
        </div>
        <div className="transfer-form__summary-row">
          <span className="transfer-form__summary-label">Amount</span>
          <span className="transfer-form__summary-value transfer-form__summary-value--amount">
            {formData.amount} {formData.currency}
          </span>
        </div>
        {formData.description && (
          <div className="transfer-form__summary-row">
            <span className="transfer-form__summary-label">Description</span>
            <span className="transfer-form__summary-value">
              {formData.description}
            </span>
          </div>
        )}
      </div>

      <div className="transfer-form__field">
        <label className="transfer-form__checkbox">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={onChange}
          />
          <span>I confirm that the transfer details are correct</span>
        </label>
        {errors.agree && (
          <span className="transfer-form__error">{errors.agree}</span>
        )}
      </div>
    </div>
  );
};

export default StepConfirm;
