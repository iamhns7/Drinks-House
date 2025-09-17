import { useTranslation } from "react-i18next";
import type { Customer } from "../interfaces/CustomerInterface";
import type { Selection } from "../interfaces/SelectionInterface";

interface ReceiptFormProps {
  storedCustomer: Customer;
  storedSelection: Selection;
  setStep: (step: 1 | 2 | 3 | 4) => void;
}

export default function ReceiptForm({
  storedCustomer,
  storedSelection,
  setStep,
}: ReceiptFormProps) {
   const { t } = useTranslation();
  return (
    <div className="receipt-container">
      <h1 className="receipt-title">{t("receiptForm.title")}</h1>
      <h3>{t("receiptForm.customerInfoTitle")}</h3>
      <p>
        <strong>{t("receiptForm.customerLabels.name")}</strong> {storedCustomer.firstName}{" "}
      </p>
      <p>
        <strong>{t("receiptForm.customerLabels.surname")}</strong> {storedCustomer.lastName}
      </p>
      <p>
        <strong>{t("receiptForm.customerLabels.email")}</strong> {storedCustomer.email}
      </p>
      <p>
        <strong>{t("receiptForm.customerLabels.phone")}</strong> {storedCustomer.phone}
      </p>
      <h3>{t("receiptForm.preferencesTitle")}</h3>
      <p>
        <strong>{t("receiptForm.preferencesLabels.category")}</strong> {storedSelection.category}
      </p>
      <p>
        <strong>{t("receiptForm.preferencesLabels.alcohol")}</strong> {storedSelection.alcohol}
      </p>
      <p>
        <strong>{t("receiptForm.preferencesLabels.ingredient")}</strong> {storedSelection.ingredient}
      </p>
      <p>
        <strong>{t("receiptForm.preferencesLabels.glass")} </strong>
        {storedSelection.glass}
      </p>

      <button className="submit-button" onClick={() => setStep(4)}>
         {t("receiptForm.buttons.confirm")}
      </button>
      <button className="submit-button" onClick={() => setStep(2)}>
         {t("receiptForm.buttons.back")}
      </button>
    </div>
  );
}
