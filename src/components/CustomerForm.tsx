import type { ChangeEvent } from "react";
import type { Customer } from "../interfaces/CustomerInterface";
import "../index.css";
import { useTranslation } from "react-i18next";

interface CustomerFormProps {
  customer: Customer;
  errors: Customer;
  handleCustomerChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCustomerNext: () => void;
}

export default function CustomerForm({
  customer,
  errors,
  handleCustomerChange,
  handleCustomerNext,
}: CustomerFormProps) {
  const { t } = useTranslation();
  

  return (
    <div className="customer-form">
      <h2>{t("customerForm.welcome")}</h2>
      <h3>{t("customerForm.enterInfo")}</h3>

      <input
        className="input-field"
        maxLength={25}
        type="text"
        name="firstName"
        placeholder={t("customerForm.placeholders.name")}
        value={customer.firstName}
        onChange={handleCustomerChange}
      />
      {errors.firstName && <p className="error">{errors.firstName}</p>}

      <input
        className="input-field"
        maxLength={20}
        type="text"
        name="lastName"
        placeholder={t("customerForm.placeholders.surname")}
        value={customer.lastName}
        onChange={handleCustomerChange}
      />
      {errors.lastName && <p className="error">{errors.lastName}</p>}

      <input
        className="input-field"
        maxLength={25}
        type="email"
        name="email"
        placeholder={t("customerForm.placeholders.email")}
        value={customer.email}
        onChange={handleCustomerChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <input
        className="input-field"
        type="tel"
        name="phone"
        placeholder={t("customerForm.placeholders.phone")}
        maxLength={11}
        value={customer.phone}
        onChange={(e) => {
          const onlyNumbers = e.target.value.replace(/\D/g, "");
          handleCustomerChange({
            target: {
              name: "phone",
              value: onlyNumbers,
            },
          } as ChangeEvent<HTMLInputElement>);
        }}
      />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <button
        className="submit-button"
        type="button"
        onClick={handleCustomerNext}
      >
        {t("customerForm.buttons.next")}
      </button>
    </div>
  );
}
