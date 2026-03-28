import type { TransferFormDataType, FormErrorsType } from "../../../types";

interface StepAmountPropsType {
  formData: TransferFormDataType;
  errors: FormErrorsType;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const StepAmount = ({ formData, errors, onChange }: StepAmountPropsType) => {
  return (
    <div className="transfer-form__fields">
      <h2 className="transfer-form__title">Transfer Amount</h2>

      <div className="transfer-form__field">
        <label className="transfer-form__label" htmlFor="amount">
          Amount
        </label>
        <input
          id="amount"
          className={`transfer-form__input${
            errors.amount ? " transfer-form__input--error" : ""
          }`}
          type="number"
          name="amount"
          value={formData.amount}
          onChange={onChange}
          placeholder="0.00"
          min="1"
        />
        {errors.amount && (
          <span className="transfer-form__error">{errors.amount}</span>
        )}
      </div>

      <div className="transfer-form__field">
        <label className="transfer-form__label" htmlFor="currency">
          Currency
        </label>
        <div className="transfer-form__select-wrapper">
          <select
            id="currency"
            className={`transfer-form__input transfer-form__input--select${
              errors.currency ? " transfer-form__input--error" : ""
            }`}
            name="currency"
            value={formData.currency}
            onChange={onChange}
          >
            <option value="RON">RON</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
          <span className="transfer-form__select-arrow" />
        </div>
        {errors.currency && (
          <span className="transfer-form__error">{errors.currency}</span>
        )}
      </div>

      <div className="transfer-form__field">
        <label className="transfer-form__label" htmlFor="description">
          Description{" "}
          <span className="transfer-form__optional">(optional)</span>
        </label>
        <input
          id="description"
          className="transfer-form__input"
          type="text"
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Payment for invoice #123"
        />
      </div>
    </div>
  );
};

export default StepAmount;
