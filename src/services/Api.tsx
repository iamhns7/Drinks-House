import axios from "axios";
import type { Category, Drink, DrinkDetails } from "../interfaces/CategoryInterfaces";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch the list of categories from the API
export const fetchCategories = async (): Promise<Category[]> => {
  const res = await axios.get(`${BASE_URL}list.php?c=list`);
  return res.data.drinks;
};

// Fetch the list of alcohol types for the filter dropdown
export const fetchAlcoholFilters = async (): Promise<{ strAlcoholic: string }[]> => {
  const res = await axios.get(`${BASE_URL}list.php?a=list`);
  return res.data.drinks;
};

// Fetch the list of all ingredients for the filter dropdown
export const fetchIngredients = async (): Promise<{ strIngredient1: string }[]> => {
  const res = await axios.get(`${BASE_URL}list.php?i=list`);
  return res.data.drinks;
};

// Fetch drinks when any filter changes: Category, Alcoholic, or Ingredient
export const fetchDrinksByFilter = async (urls: string[]): Promise<Drink[]> => {
  const results = await Promise.all(
    urls.map(url => axios.get(url).then(res => res.data.drinks || []))
  );

  return results.reduce((acc: Drink[], curr: Drink[]) => {
    if (acc.length === 0) return curr;
    const ids = new Set(curr.map(d => d.idDrink));
    return acc.filter(d => ids.has(d.idDrink));
  }, [] as Drink[]);
};

export const fetchDrinkDetails = async (id: string): Promise<DrinkDetails> => {
  const res = await axios.get(`${BASE_URL}lookup.php?i=${id}`);
  return res.data.drinks[0];
};
