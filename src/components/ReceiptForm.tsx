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
  return (
    <div className="receipt-container">
      <h1 className="receipt-title">Receipt</h1>
      <h3>Customer Info:</h3>
      <p>
        <strong>Name:</strong> {storedCustomer.firstName}{" "}
      </p>
      <p>
        <strong>Surname:</strong> {storedCustomer.lastName}
      </p>
      <p>
        <strong>Email:</strong> {storedCustomer.email}
      </p>
      <p>
        <strong>Phone:</strong> {storedCustomer.phone}
      </p>
      <h3>Customer Drink Preferences:</h3>
      <p>
        <strong>Category:</strong> {storedSelection.category}
      </p>
      <p>
        <strong>Alcohol:</strong> {storedSelection.alcohol}
      </p>
      <p>
        <strong>Ingredient:</strong> {storedSelection.ingredient}
      </p>
      <p>
        <strong>Glass: </strong>
        {storedSelection.glass}
      </p>

      <button className="submit-button" onClick={() => setStep(4)}>
        Confirm
      </button>
      <button className="submit-button" onClick={() => setStep(2)}>
        Back
      </button>
    </div>
  );
}
