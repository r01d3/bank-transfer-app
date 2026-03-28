import type { TransferFormDataType, FormErrorsType } from "../../../types";

interface StepRecipientPropsType {
  formData: TransferFormDataType;
  errors: FormErrorsType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StepRecipient = ({
  formData,
  errors,
  onChange,
}: StepRecipientPropsType) => {
  return (
    <div className="transfer-form__fields">
      <h2 className="transfer-form__title">Transfer Details</h2>

      <div className="transfer-form__field">
        <label className="transfer-form__label" htmlFor="fromIban">
          Your IBAN
        </label>
        <input
          id="fromIban"
          className={`transfer-form__input${
            errors.fromIban ? " transfer-form__input--error" : ""
          }`}
          type="text"
          name="fromIban"
          value={formData.fromIban}
          onChange={onChange}
          placeholder="RO49AAAA1B31007593840000"
        />
        {errors.fromIban && (
          <span className="transfer-form__error">{errors.fromIban}</span>
        )}
      </div>

      <div className="transfer-form__field">
        <label className="transfer-form__label" htmlFor="recipientName">
          Recipient Name
        </label>
        <input
          id="recipientName"
          className={`transfer-form__input${
            errors.recipientName ? " transfer-form__input--error" : ""
          }`}
          type="text"
          name="recipientName"
          value={formData.recipientName}
          onChange={onChange}
          placeholder="John Doe"
        />
        {errors.recipientName && (
          <span className="transfer-form__error">{errors.recipientName}</span>
        )}
      </div>

      <div className="transfer-form__field">
        <label className="transfer-form__label" htmlFor="toIban">
          Recipient IBAN
        </label>
        <input
          id="toIban"
          className={`transfer-form__input${
            errors.toIban ? " transfer-form__input--error" : ""
          }`}
          type="text"
          name="toIban"
          value={formData.toIban}
          onChange={onChange}
          placeholder="RO49AAAA1B31007593840000"
        />
        {errors.toIban && (
          <span className="transfer-form__error">{errors.toIban}</span>
        )}
      </div>

      <div className="transfer-form__field">
        <label className="transfer-form__label" htmlFor="bank">
          Recipient Bank
        </label>
        <input
          id="bank"
          className={`transfer-form__input${
            errors.bank ? " transfer-form__input--error" : ""
          }`}
          type="text"
          name="bank"
          value={formData.bank}
          onChange={onChange}
          placeholder="BCR, ING, Raiffeisen..."
        />
        {errors.bank && (
          <span className="transfer-form__error">{errors.bank}</span>
        )}
      </div>
    </div>
  );
};

export default StepRecipient;
