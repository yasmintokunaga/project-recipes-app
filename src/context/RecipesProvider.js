import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';
import { fetchRecipesMeals, fetchRecipesDrinks } from '../services/fetchRecipes';
import { fetchCategoriesDrinks, fetchCategoriesMeals } from '../services/fetchCategories';

export const RecipesContext = createContext();

function RecipesProvider({ children }) {
  const MAX_NUMBER_RECIPES = 12;
  const MAX_NUMBER_CATEGORIES = 5;
  const [path, setPath] = useState(window.location.pathname);
  const [listRecipes, setListRecipes] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [numberRecipes] = useState(MAX_NUMBER_RECIPES);
  const [numberCategories] = useState(MAX_NUMBER_CATEGORIES);

  useEffect(() => {
    async function fetchData() {
      const recipes = path === '/drinks'
        ? await fetchRecipesDrinks() : await fetchRecipesMeals();
      const categories = path === '/drinks'
        ? await fetchCategoriesDrinks() : await fetchCategoriesMeals();

      const configRecipes = recipes.filter((_recipe, index) => index < numberRecipes);
      const configCategories = categories
        .map(({ strCategory }) => strCategory)
        .filter((_recipe, index) => index < numberCategories);
      setCategoriesNames(configCategories);
      setListRecipes(configRecipes);
    }
    fetchData();
  }, [numberCategories, numberRecipes, path]);

  const values = useMemo(() => ({
    listRecipes,
    setListRecipes,
    categoriesNames,
    numberRecipes,
    path,
    setPath,
  }), [listRecipes, categoriesNames, numberRecipes, path]);

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
