import { useState, useEffect, type ChangeEvent } from "react";
import type { Customer } from "../interfaces/CustomerInterface";
import type { Category, Drink } from "../interfaces/CategoryInterfaces";
import type { Selection } from "../interfaces/SelectionInterface";
import {
  fetchCategories,
  fetchAlcoholFilters,
  fetchIngredients,
  fetchGlassTypes,
  fetchDrinksByCategory,
} from "../services/Api";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateSurname,
} from "../validate/validateCostumer";

import CustomerForm from "../components/CustomerForm";
import CategoryForm from "../components/CategoryForm";
import ReceiptForm from "../components/ReceiptForm";
import CategoryDrink from "../components/DrinkForm";

export default function MainPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Customer state
  const [customer, setCustomer] = useState<Customer>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "05",
  });
  const [errors, setErrors] = useState<Customer>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Filters state
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [alcoholFilters, setAlcoholFilters] = useState<
    { strAlcoholic: string }[]
  >([]);
  const [alcoholicFilter, setAlcoholicFilter] = useState<string>("");
  const [ingredients, setIngredients] = useState<{ strIngredient1: string }[]>(
    []
  );
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");
  const [glasses, setGlasses] = useState<{ strGlass: string }[]>([]);
  const [selectedGlass, setSelectedGlass] = useState<string>("");

  // Drinks state
  const [drinksByCategory, setDrinksByCategory] = useState<Drink[]>([]);
  const [loadingDrinks, setLoadingDrinks] = useState(false);

  // Stored data
  const [storedCustomer, setStoredCustomer] = useState<Customer | null>(null);
  const [storedSelection, setStoredSelection] = useState<Selection | null>(
    null
  );

  // Load dropdown data once
  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
    fetchAlcoholFilters().then(setAlcoholFilters).catch(console.error);
    fetchIngredients().then(setIngredients).catch(console.error);
    fetchGlassTypes().then(setGlasses).catch(console.error);
  }, []);

  // Load stored customer & selection
  useEffect(() => {
    const c = localStorage.getItem("customer");
    const s = localStorage.getItem("selection");
    if (c) setStoredCustomer(JSON.parse(c));
    if (s) setStoredSelection(JSON.parse(s));
  }, [step]);

  // Fetch drinks when step 4
  useEffect(() => {
    if (step !== 4 || !storedSelection?.category) return;
    setLoadingDrinks(true);

    fetchDrinksByCategory(storedSelection.category)
      .then(setDrinksByCategory)
      .catch(console.error)
      .finally(() => setLoadingDrinks(false));
  }, [step, storedSelection]);

  // Handlers
  const handleCustomerChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setCustomer({ ...customer, [name]: value });

  let errorMessage: string | null = null;
  if (name === "firstName") errorMessage = validateName(value);
  else if (name === "lastName") errorMessage = validateSurname(value);
  else if (name === "email") errorMessage = validateEmail(value);
  else if (name === "phone") errorMessage = validatePhone(value); 

  setErrors({ ...errors, [name]: errorMessage || "" });
};
  const handleCustomerNext = () => {
    const newErrors: Customer = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
    let hasError = false;

    const fErr = validateName(customer.firstName);
    if (fErr) {
      newErrors.firstName = fErr;
      hasError = true;
    }

    const lErr = validateSurname(customer.lastName);
    if (lErr) {
      newErrors.lastName = lErr;
      hasError = true;
    }

    const eErr = validateEmail(customer.email);
    if (eErr) {
      newErrors.email = eErr;
      hasError = true;
    }

    const pErr = validatePhone(customer.phone);
    if (pErr) {
      newErrors.phone = pErr;
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      localStorage.setItem("customer", JSON.stringify(customer));
      setStep(2);
    }
  };

  const handleCategoryConfirm = () => {
    const selection: Selection = {
      category: selectedCategory,
      alcohol: alcoholicFilter || undefined,
      ingredient: selectedIngredient || undefined,
      glass: selectedGlass || undefined,
    };
    localStorage.setItem("selection", JSON.stringify(selection));
    setStep(3);
  };

  return (
    <div className="main-background">
      <div className="main-container">
        {step === 1 && (
          <CustomerForm
            customer={customer}
            errors={errors}
            handleCustomerChange={handleCustomerChange}
            handleCustomerNext={handleCustomerNext}
          />
        )}

        {step === 2 && (
          <CategoryForm
            categories={categories}
            alcoholFilters={alcoholFilters}
            ingredients={ingredients}
            glasses={glasses}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            alcoholicFilter={alcoholicFilter}
            setAlcoholicFilter={setAlcoholicFilter}
            selectedIngredient={selectedIngredient}
            setSelectedIngredient={setSelectedIngredient}
            selectedGlass={selectedGlass}
            setSelectedGlass={setSelectedGlass}
            handleCategoryConfirm={handleCategoryConfirm}
            setStep={setStep}
          />
        )}

        {step === 3 && storedCustomer && storedSelection && (
          <ReceiptForm
            storedCustomer={storedCustomer}
            storedSelection={storedSelection}
            setStep={setStep}
          />
        )}

        {step === 4 && storedSelection && (
          <CategoryDrink
            storedSelection={storedSelection}
            drinksByCategory={drinksByCategory}
            loadingDrinks={loadingDrinks}
            setStep={setStep}
          />
        )}
      </div>
    </div>
  );
}
