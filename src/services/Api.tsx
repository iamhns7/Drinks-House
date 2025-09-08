import axios from "axios";
import type { Category, Drink, DrinkDetail } from "../interfaces/CategoryInterfaces";

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
// Fetch the list of all glasses for the filter dropdown
export const fetchGlassTypes = async (): Promise<{ strGlass: string }[]> => {
  const res = await axios(`${BASE_URL}list.php?g=list`);
 
  return res.data.drinks; 
};

// Fetch drinks by category (returns all drinks in that category)
export const fetchDrinksByCategory = async (category: string): Promise<Drink[]> => {
  const res = await axios.get(`${BASE_URL}filter.php?c=${encodeURIComponent(category)}`);
  return res.data.drinks || [];
};

// Fetch drink details by ID
export const fetchDrinkDetails = async (id: string): Promise<DrinkDetail> => {
  const res = await axios.get(`${BASE_URL}lookup.php?i=${id}`);
  return res.data.drinks[0];
};
