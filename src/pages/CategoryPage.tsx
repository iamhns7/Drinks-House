 import { useState, useEffect } from "react";
import type { Category, Drink, DrinkDetails } from "../interfaces/CategoryInterfaces";
import { fetchCategories, fetchAlcoholFilters, fetchIngredients, fetchDrinksByFilter, fetchDrinkDetails 
} from "../services/Api";


export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [alcoholFilters, setAlcoholFilters] = useState<{ strAlcoholic: string }[]>([]);
  const [alcoholicFilter, setAlcoholicFilter] = useState<string>("");

  const [ingredients, setIngredients] = useState<{ strIngredient1: string }[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");

  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<string>("");

  const [selectedDrinkDetails, setSelectedDrinkDetails] = useState<DrinkDetails | null>(null);

  

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
    fetchAlcoholFilters().then(setAlcoholFilters).catch(console.error);
    fetchIngredients().then(setIngredients).catch(console.error);
  }, []);

  useEffect(() => {
    const urls: string[] = [];
    if (selectedCategory) urls.push(`filter.php?c=${selectedCategory}`);
    if (alcoholicFilter) urls.push(`filter.php?a=${alcoholicFilter}`);
    if (selectedIngredient) urls.push(`filter.php?i=${selectedIngredient}`);

    if (urls.length === 0) {
      setDrinks([]);
      return;
    }

    fetchDrinksByFilter(urls.map(u => `${import.meta.env.VITE_API_BASE_URL}${u}`))
      .then(setDrinks)
      .catch(console.error);
    setSelectedDrink("");
    setSelectedDrinkDetails(null);
  }, [selectedCategory, alcoholicFilter, selectedIngredient]);
  

  useEffect(() => {
    if (!selectedDrink) return;
    fetchDrinkDetails(selectedDrink)
      .then(setSelectedDrinkDetails)
      .catch(console.error);
  }, [selectedDrink]);


   return (
  <div className="form-container">
    <form className="form-box">
      <h2>Select Ingredient</h2>
      <select
        className="select-ingredient"
        value={selectedIngredient}
        onChange={e => setSelectedIngredient(e.target.value)}
      >
        <option value="">Any</option>
        {ingredients.map(i => (
          <option key={i.strIngredient1} value={i.strIngredient1}>{i.strIngredient1}</option>
        ))}
      </select>
      
      <h2>Select a Category</h2>
      <select
        className="select-category"
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
      >
        <option value="">Any</option>
        {categories.map(cat => (
          <option key={cat.strCategory} value={cat.strCategory}>{cat.strCategory}</option>
        ))}
      </select>

      
      <h2>Filter by Alcohol</h2>
      <select
        className="select-alcohol"
        value={alcoholicFilter}
        onChange={e => setAlcoholicFilter(e.target.value)}
      >
        <option value="">Any</option>
        {alcoholFilters.map(al => (
          <option key={al.strAlcoholic} value={al.strAlcoholic}>{al.strAlcoholic}</option>
        ))}
      </select>
      <h2>Select Drink</h2>
      <select
        value={selectedDrink}
        onChange={e => setSelectedDrink(e.target.value)}
        className="select-drink"
      >
        <option value="">Any</option>
        {drinks.map(d => (
          <option key={d.idDrink} value={d.idDrink}>{d.strDrink}</option>
        ))}
      </select>

      
      {selectedDrinkDetails && (
        <div className="drink-details">
          <h3>Drink details:</h3>
          <h3>{selectedDrinkDetails.strDrink}</h3>
          <img src={selectedDrinkDetails.strDrinkThumb} width={200} />
          <p>{selectedDrinkDetails.strInstructions}</p>
          <p><b>Type:</b> {selectedDrinkDetails.strAlcoholic}</p>
        </div>
      )}

      <button type="submit" className="submit-button">Confirm Selection</button>
    </form>
  </div>
);
}

 
