import type { Drink } from "../interfaces/CategoryInterfaces";
import type { Selection } from "../interfaces/SelectionInterface";

interface CategoryDrinkProps {
  storedSelection: Selection;
  drinksByCategory: Drink[];
  loadingDrinks: boolean;
  setStep: (step: 1 | 2 | 3 | 4) => void;
}

export default function CategoryDrink({
  storedSelection,
  drinksByCategory,
  loadingDrinks,
  setStep,
}: CategoryDrinkProps) {
  return (
    <div className="drink-form-container">
      <h1 className="drink-title">Drinks in {storedSelection.category}</h1>
      {loadingDrinks && <p>Loading drinks...</p>}
      <div className="drink-cards-container">
        {drinksByCategory.length === 0 && !loadingDrinks ? (
          <p>No drinks found</p>
        ) : (
          drinksByCategory.map((drink) => (
            <div key={drink.idDrink} className="drink-card">
              <h4>{drink.strDrink}</h4>
              {drink.strDrinkThumb && (
                <img src={drink.strDrinkThumb} alt={drink.strDrink} />
              )}
              <p>ID: {drink.idDrink}</p>
            </div>
          ))
        )}
      </div>
      <button className="drink-submit-button-done" onClick={() => setStep(1)}>
        Done
      </button>
      <button className="drink-submit-button-back" onClick={() => setStep(3)}>
        Back
      </button>
    </div>
  );
}
