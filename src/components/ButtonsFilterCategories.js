import { useContext, useState } from 'react';
import { RecipesContext } from '../context/RecipesProvider';
import { fetchRecipesMeals, fetchRecipesDrinks } from '../services/fetchRecipes';
import {
  fetchRecepiesByCategoryMeals,
  fetchRecepiesByCategoryDrinks,
} from '../services/fetchRecipiesByCategory';

function ButtonsFilterCategories() {
  const [filterDisabled, setfilterDisabled] = useState(true);
  const {
    categoriesNames, setListRecipes, numberRecipes, path } = useContext(RecipesContext);

  async function handleRemoveFilter() {
    const recipes = path === '/drinks'
      ? await fetchRecipesDrinks() : await fetchRecipesMeals();
    const configRecipes = recipes.filter((_recipe, index) => index < numberRecipes);
    setListRecipes(configRecipes);
    setfilterDisabled(true);
  }

  async function handleFilterButton(category) {
    if (filterDisabled) {
      const listFilterByCategory = path === '/drinks'
        ? await fetchRecepiesByCategoryDrinks(category)
        : await fetchRecepiesByCategoryMeals(category);
      const configList = listFilterByCategory
        .filter((_recipe, index) => index < numberRecipes);
      setListRecipes(configList);
      setfilterDisabled(false);
    } else {
      await handleRemoveFilter();
    }
  }

  return (
    <section>
      { categoriesNames.map((category) => (
        <button
          data-testid={ `${category}-category-filter` }
          onClick={ () => handleFilterButton(category) }
          key={ `${category}-category-filter` }
        >
          { category }
        </button>
      ))}
      <button
        data-testid="All-category-filter"
        onClick={ () => handleRemoveFilter() }
      >
        Limpar Filtros
      </button>
    </section>
  );
}
export default ButtonsFilterCategories;
