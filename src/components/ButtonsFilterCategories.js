import { useContext, useState } from 'react';
import { RecipesContext } from '../context/RecipesProvider';
import { fetchRecipesMeals, fetchRecipesDrinks } from '../services/fetchRecipes';
import { fetchRecepiesByCategoryMeals, fetchRecepiesByCategoryDrinks } from '../services/fetchRecipiesByCategory';

function ButtonsFilterCategories() {
  const { categoriesNames, setListRecipes, numberRecipes } = useContext(RecipesContext);
  const path = window.location.pathname;

  async function handleFilterButton(category) {
    const listFilterByCategory = path === '/meals'
      ? await fetchRecepiesByCategoryMeals(category)
      : await fetchRecepiesByCategoryDrinks(category);
    const configList = listFilterByCategory.filter((_recipe, index) => index < numberRecipes);
    setListRecipes(configList);
  }

  async function handleRemoveFilter() {
    const recipes = path === '/drinks'
    ? await fetchRecipesDrinks() : await fetchRecipesMeals();  
    const configRecipes = recipes.filter((_recipe, index) => index < numberRecipes);
    setListRecipes(configRecipes);
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
