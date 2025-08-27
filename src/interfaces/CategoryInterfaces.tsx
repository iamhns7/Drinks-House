export interface Category {
  strCategory: string;
}

export interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strAlcoholic?: string; 
}

export interface DrinkDetails {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strAlcoholic: string;

}
