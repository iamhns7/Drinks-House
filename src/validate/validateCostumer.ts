// Validate Name
export const validateName = (name: string): string | null => {
  if (!name.trim()) return "This field is required";
  if (!/^[A-Za-zğüşöçıİĞÜŞÖÇ]+$/.test(name)) return "Only letters allowed";
  return null;
};

// Validate Surname
export const validateSurname = (surname: string): string | null => {
  if (!surname.trim()) return "This field is required";
  if (!/^[A-Za-zğüşöçıİĞÜŞÖÇ]+$/.test(surname)) return "Only letters allowed";
  return null;
};

// Validate Email
export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return "This field is required";
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email))
    return "Invalid email format";
  return null;
};

// Validate Phone
export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) return "Phone number is required";
  if (!/^05\d{9}$/.test(phone))
    return "Phone must start with 05 and be exactly 11 digits";
  return null;
};