import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';

export const RecipesContext = createContext();

function RecipesProvider({ children }) {
  const [listRecipes, setListRecipes] = useState([]);

  async function fetchRecipesMeals() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data.meals;
  }

  async function fetchRecipesDrinks() {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data.drinks;
  }

  useEffect(() => {
    async function fetchData() {
      const path = window.location.pathname;
      const recipes = path === '/drinks'
        ? await fetchRecipesDrinks() : await fetchRecipesMeals();
      setListRecipes(recipes);
    }
    fetchData();
  }, []);

  const values = useMemo(() => ({
    listRecipes,
  }), [listRecipes]);

  return (
    <RecipesContext.Provider value={ values }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
