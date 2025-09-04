import type { Category } from "../interfaces/CategoryInterfaces";

interface CategoryFormProps {
  categories: Category[];
  alcoholFilters: { strAlcoholic: string }[];
  ingredients: { strIngredient1: string }[];
  glasses: { strGlass: string }[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  alcoholicFilter: string;
  setAlcoholicFilter: (value: string) => void;
  selectedIngredient: string;
  setSelectedIngredient: (value: string) => void;
  selectedGlass: string;
  setSelectedGlass: (value: string) => void;
  handleCategoryConfirm: () => void;
  setStep: (step: 1 | 2 | 3 | 4) => void;
}

export default function CategoryForm({
  categories,
  alcoholFilters,
  ingredients,
  glasses,
  selectedCategory,
  setSelectedCategory,
  alcoholicFilter,
  setAlcoholicFilter,
  selectedIngredient,
  setSelectedIngredient,
  selectedGlass,
  setSelectedGlass,
  handleCategoryConfirm,
  setStep,
}: CategoryFormProps) {
  return (
    <div className="category-form">
      <h2>Select Filters</h2>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.strCategory} value={cat.strCategory}>
            {cat.strCategory}
          </option>
        ))}
      </select>

      <select
        value={alcoholicFilter}
        onChange={(e) => setAlcoholicFilter(e.target.value)}
      >
        <option value="">Filter by Alcohol</option>
        {alcoholFilters.map((al) => (
          <option key={al.strAlcoholic} value={al.strAlcoholic}>
            {al.strAlcoholic}
          </option>
        ))}
      </select>

      <select
        value={selectedIngredient}
        onChange={(e) => setSelectedIngredient(e.target.value)}
      >
        <option value="">Select Ingredient</option>
        {ingredients.map((i) => (
          <option key={i.strIngredient1} value={i.strIngredient1}>
            {i.strIngredient1}
          </option>
        ))}
      </select>

      <select
        value={selectedGlass}
        onChange={(e) => setSelectedGlass(e.target.value)}
      >
        <option value="">Select Glass</option>
        {glasses.map((g) => (
          <option key={g.strGlass} value={g.strGlass}>
            {g.strGlass}
          </option>
        ))}
      </select>

      <button className="submit-button" onClick={handleCategoryConfirm}>
        Confirm Selection
      </button>
      <button className="submit-button" onClick={() => setStep(1)}>
        Back
      </button>
    </div>
  );
}
