import { useState } from "react";
import type { Drink, DrinkDetail } from "../interfaces/CategoryInterfaces";
import type { Selection } from "../interfaces/SelectionInterface";
import { fetchDrinkDetails } from "../services/Api";

interface CategoryDrinkProps {
  storedSelection: Selection;
  drinksByCategory: Drink[];
  loadingDrinks: boolean;
  setStep: (step: 1 | 2 | 3 | 4) => void;
}

export default function DrinkForm({
  storedSelection,
  drinksByCategory,
  loadingDrinks,
  setStep,
}: CategoryDrinkProps) {

  const [selectedDrinkDetail, setSelectedDrinkDetail] = useState<DrinkDetail | null>(null);

const handleDrinkClick = async (id: string) => {
    const drinkDetails = await fetchDrinkDetails(id);
    setSelectedDrinkDetail(drinkDetails);
};

  return (
    <div className="drink-form-container">
      <h1 className="drink-title">Drinks in {storedSelection.category}</h1>

      {loadingDrinks && <p>Loading drinks...</p>}
    <div className="drink-cards-container">
  {drinksByCategory.length === 0 && !loadingDrinks ? (
    <p>No drinks found</p>
  ) : (
    drinksByCategory.map((drink) => (
      <div
        key={drink.idDrink}
        className="drink-card"
      >
        <h4>{drink.strDrink}</h4>
        {drink.strDrinkThumb && (
          <img src={drink.strDrinkThumb} alt={drink.strDrink} />
        )}
        <p>ID: {drink.idDrink}</p>

    <div className="card-buttons">
  <button
    className="card-button"
    onClick={() => handleDrinkClick(drink.idDrink)}
  >
    More
  </button>

  {selectedDrinkDetail && selectedDrinkDetail.idDrink === drink.idDrink && (
    <button
      className="card-button-less-button"
      onClick={() => setSelectedDrinkDetail(null)}
    >
      Less
    </button>
  )}
</div>


        {selectedDrinkDetail && selectedDrinkDetail.idDrink === drink.idDrink && (
          <div className="drink-detail">
            <h3 className="detail-strdrink">{selectedDrinkDetail.strDrink}</h3>
            {selectedDrinkDetail.strDrinkThumb && (
              <img
                
                src={selectedDrinkDetail.strDrinkThumb}
                alt={selectedDrinkDetail.strDrink}
              />
            )}
            <ul>
              {Object.entries(selectedDrinkDetail).map(([key, value]) => {
                if (!value) return null;
                return (
                  <li  key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    ))
  )}
</div>    
<div className="drink-buttons">
        <button className="drink-submit-button-back" onClick={() => setStep(3)}>
          Back
        </button>
        <button className="drink-submit-button-done" onClick={() => setStep(1)}>
          Done
        </button>
      </div>
    </div>
  );
}

