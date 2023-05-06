import { useContext, useState } from 'react';
import { RecipesContext } from '../context/RecipesProvider';
import ListMealsOrDrinks from './RecipesMealsOrDrinks';
import { fetchRecepiesByCategoryMeals, fetchRecepiesByCategoryDrinks } from '../services/fetchRecipiesByCategory';

function ButtonsFilterCategories() {
  const { categoriesNames, setListRecipes, numberRecipes } = useContext(RecipesContext);

  async function handleFilterButton(category) {
    const listFilterByCategory = window.location.pathname === '/meals'
      ? await fetchRecepiesByCategoryMeals(category)
      : await fetchRecepiesByCategoryDrinks(category);
    const configList = listFilterByCategory.filter((_recipe, index) => index < numberRecipes);
    setListRecipes(configList);
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
    </section>
  );
}
export default ButtonsFilterCategories;
