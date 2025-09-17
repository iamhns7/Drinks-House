import { useState, useEffect } from "react";
import type { Drink, DrinkDetail } from "../interfaces/CategoryInterfaces";
import type { Selection } from "../interfaces/SelectionInterface";
import { fetchDrinkDetails, fetchDrinksByCategory } from "../services/Api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../index.css";
import { useTranslation } from "react-i18next";

interface CategoryDrinkProps {
  storedSelection: Selection;
  drinksByCategory: Drink[];
  setStep: (step: 1 | 2 | 3 | 4) => void;
  loadingDrinks: boolean;
}

export default function DrinkForm({ storedSelection, setStep }: CategoryDrinkProps) {
  const [drinksByCategory, setDrinksByCategory] = useState<Drink[]>([]);
  const [selectedDrinkDetail, setSelectedDrinkDetail] = useState<DrinkDetail | null>(null);
  const [loadingDetailId, setLoadingDetailId] = useState<string | null>(null);
  const [loadingDrinks, setLoadingDrinks] = useState(false);

  const { t } = useTranslation();
  
useEffect(() => {
  const fetchDrinks = async () => {
    setLoadingDrinks(true);
    const data = await fetchDrinksByCategory(storedSelection.category);
    setDrinksByCategory(data);
    setLoadingDrinks(false);
  };
  fetchDrinks();
}, [storedSelection.category]);


  
 
 const handleDrinkClick = async (id: string) => {
  setLoadingDetailId(id);        
  const drinkDetails = await fetchDrinkDetails(id);
  setSelectedDrinkDetail(drinkDetails);
  setLoadingDetailId(null);       
};


  return (
    <div className="drink-form-container">
      <h1 className="drink-title">{t("drinkForm.title", { category: storedSelection.category })}</h1>

      {loadingDrinks ? (
        <div className="drink-cards-container">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="drink-card">
              <Skeleton className="title-skeleton" />
              <Skeleton className="image-skeleton" />
              <Skeleton className="id-skeleton" />
              <div className="card-buttons">
                <Skeleton className="more-skeleton" />
                <Skeleton className="less-skeleton" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="drink-cards-container">
          {drinksByCategory.length === 0 ? (
            <p>{t("drinkForm.noDrinks")}</p>
          ) : (
            drinksByCategory.map((drink) => (
              <div key={drink.idDrink} className="drink-card">
                <h4>{drink.strDrink}</h4>
                {drink.strDrinkThumb && <img src={drink.strDrinkThumb} alt={drink.strDrink} />}
                <p>ID: {drink.idDrink}</p>

                <div className="card-buttons">
                  <button className="card-button" onClick={() => handleDrinkClick(drink.idDrink)}>
                    {t("drinkForm.cardButtons.more")}
                  </button>
                  {selectedDrinkDetail?.idDrink === drink.idDrink && (
                    <button
                      className="card-button-less-button"
                      onClick={() => setSelectedDrinkDetail(null)}
                    >
                      {t("drinkForm.cardButtons.less")}
                    </button>
                  )}
                </div>

             {loadingDetailId === drink.idDrink ? (
                <div className="drink-detail">
                  <Skeleton className="title-skeleton" />
                  <Skeleton className="image-skeleton" />
                  <Skeleton className="detail-by-id-skeleton" />
                </div>
              ) : (
                selectedDrinkDetail?.idDrink === drink.idDrink && (
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
                          <li key={key}>
                            <strong>{key}:</strong> {value}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
  )
)}

              </div>
            ))
          )}
        </div>
      )}

      <div className="drink-buttons">
        <button className="drink-submit-button-back" onClick={() => setStep(3)}>
        {t("drinkForm.buttons.back")}
        </button>
        <button className="drink-submit-button-done" onClick={() => setStep(1)}>
          {t("drinkForm.buttons.done")}
        </button>
      </div>
    </div>
  );
}
