import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { validateEmail, validatePhone, validateName, validateSurname } from "../validate/validateCostumer";
import '../index.css';
import type { Customer } from "../interfaces/CustomerInterface";
import { useNavigate } from "react-router-dom";



export default function CustomerFormPage() {
  const [customer, setCustomer] = useState<Customer>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Customer>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCustomer({ ...customer, [name]: value });

    if (errors[name as keyof Customer]) {
      let errorMessage = "";
      if (name === "firstName"  ) {
        errorMessage = validateName(value) || "";
      }else if(name === "lastName") {
          errorMessage = validateSurname(value) || "";
      }
      else if (name === "email") {
        errorMessage = validateEmail(value) || "";
      } else if (name === "phone") {
        errorMessage = validatePhone(value) || "";
      }

      setErrors({ ...errors, [name]: errorMessage });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const firstNameError = validateName(customer.firstName);
  if (firstNameError) {
    setErrors({ ...errors, firstName: firstNameError });
    return;
  }

  const lastNameError = validateSurname(customer.lastName);
  if (lastNameError) {
    setErrors({ ...errors, lastName: lastNameError });
    return;
  }

  const emailError = validateEmail(customer.email);
  if (emailError) {
    setErrors({ ...errors, email: emailError });
    return;
  }

  const phoneError = validatePhone(customer.phone);
  if (phoneError) {
    setErrors({ ...errors, phone: phoneError });
    return;
  } 

  const phoneNumber: number = parseInt(customer.phone);
  console.log("Phone as number:", phoneNumber);
  
  navigate("/categories");
};


  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="customer-form">
        <div className="form-text">
          <h2>Welcome to Drink House!</h2>
          <h3>Can you enter your information please</h3>
        </div>

<input
  type="text"
  name="firstName"
  placeholder="Name"
  value={customer.firstName}
  maxLength={20} 
  minLength={2}
  onChange={handleChange}
/>
{errors.firstName && <p className="error">{errors.firstName}</p>}

<input
  type="text"
  name="lastName"
  placeholder="Surname"
  value={customer.lastName}
  maxLength={15} 
  minLength={2}
  onChange={handleChange}
/>
{errors.lastName && <p className="error">{errors.lastName}</p>}


<input
  type="email"
  name="email"
  placeholder="Email"
  value={customer.email}
  onChange={handleChange}
/>
{errors.email && <p className="error">{errors.email}</p>}

<input
  type="tel"
  name="phone"
  placeholder="Phone Number"
  value={customer.phone || "05"} 
  maxLength={11} 
  onChange={(e) => {
    let value = e.target.value;

    if (!value.startsWith("05")) {
      value = "05";
    }

    value = value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    setCustomer({ ...customer, phone: value });
  }}
/>
{errors.phone && <p className="error">{errors.phone}</p>}

        <button type="submit">Next</button>
      </form>
    </div>
  );
}
 
