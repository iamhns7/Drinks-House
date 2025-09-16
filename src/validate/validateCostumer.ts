import type { TFunction } from "i18next";



export const validateName = (name: string, t: TFunction): string | null => {
  if (!name.trim())
    return t("customerForm.errors.required", { field: t("customerForm.placeholders.name") });
  if (!/^[A-Za-zğüşöçıİĞÜŞÖÇ]+$/.test(name))
    return t("customerForm.errors.lettersOnly");
  return null;
};

// Validate Surname
export const validateSurname = (surname: string, t: TFunction): string | null => {
  if (!surname.trim())
    return t("customerForm.errors.required", { field: t("customerForm.placeholders.surname") });
  if (!/^[A-Za-zğüşöçıİĞÜŞÖÇ]+$/.test(surname))
    return t("customerForm.errors.lettersOnly");
  return null;
};

// Validate Email
export const validateEmail = (email: string, t: TFunction): string | null => {
  if (!email.trim())
    return t("customerForm.errors.required", { field: t("customerForm.placeholders.email") });
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email))
    return t("customerForm.errors.invalidEmail");
  return null;
};

// Validate Phone
export const validatePhone = (phone: string, t: TFunction): string | null => {
  if (!phone.trim())
    return t("customerForm.errors.required", { field: t("customerForm.placeholders.phone") });
  if (!/^05\d{9}$/.test(phone))
    return t("customerForm.errors.invalidPhone");
  return null;
};
