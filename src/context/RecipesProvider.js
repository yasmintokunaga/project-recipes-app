import PropTypes from 'prop-types';
import { fetchRecipesMeals, fetchRecipesDrinks } from '../services/fetchRecipes';
import { createContext, useEffect, useMemo, useState } from 'react';
import { fetchCategoriesDrinks, fetchCategoriesMeals } from '../services/fetchCategories';

export const RecipesContext = createContext();

function RecipesProvider({ children }) {
  const [path] = useState(window.location.pathname);
  const [listRecipes, setListRecipes] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [numberRecipes] = useState(12);
  const [numberCategories] = useState(5);

  useEffect(() => {
    async function fetchData() {
      const recipes = path === '/drinks'
        ? await fetchRecipesDrinks() : await fetchRecipesMeals();
      const categories = path === '/drinks'
        ? await fetchCategoriesDrinks() : await fetchCategoriesMeals();
      
      const configRecipes = recipes.filter((_recipe, index) => index < numberRecipes);
      const configCategories = categories
        .map(({ strCategory }) => strCategory)
        .filter((_recipe, index) => index < numberCategories)
      setCategoriesNames(configCategories);
      setListRecipes(configRecipes);
    }
    fetchData();
  }, []);

  const values = useMemo(() => ({
    listRecipes,
    setListRecipes,
    categoriesNames,
    numberRecipes,
  }), [listRecipes, categoriesNames]);

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
