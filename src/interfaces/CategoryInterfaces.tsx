export interface Category {
  strCategory: string;
}

export interface Drink {
  idDrink: string;
  strDrink: string;
strDrinkThumb: string
}

export interface DrinkDetail {
  idDrink: string;
  strDrink: string;
  [key: string]: string | null | undefined; 
}



