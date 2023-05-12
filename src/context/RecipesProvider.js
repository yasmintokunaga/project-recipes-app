import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchRecipesMeals, fetchRecipesDrinks } from '../services/fetchRecipes';
import { fetchCategoriesDrinks, fetchCategoriesMeals } from '../services/fetchCategories';
import { fetchRecipeByType } from '../services/fetchRecipiesByCategory';

export const RecipesContext = createContext();

function RecipesProvider({ children }) {
  const MAX_NUMBER_RECIPES = 12;
  const MAX_NUMBER_CATEGORIES = 5;
  const [path, setPath] = useState(window.location.pathname);
  const [listRecipes, setListRecipes] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [numberRecipes] = useState(MAX_NUMBER_RECIPES);
  const [numberCategories] = useState(MAX_NUMBER_CATEGORIES);

  const history = useHistory();

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

  useEffect(() => {
    if (listRecipes.length === 1) {
      const id = path === '/meals'
        ? `${path}/${listRecipes[0].idMeal}` : `${path}/${listRecipes[0].idDrink}`;

      history.push(`${id}`);
    }
  }, [history, listRecipes, path]);

  const values = useMemo(() => {
    // const message = 'Sorry, we haven\'t found any recipes for these filters.'

    async function handleClickExec(radio, parameter) {
      console.log('exec');
      if (radio === 'ing') {
        await fetchRecipeByType('i', parameter, 'filter', path.slice(1)).then((item) => {
          console.log(item);
          setListRecipes(item);
        });
      } else if (radio === 'name') {
        await fetchRecipeByType('s', parameter, 'search', path.slice(1)).then((item) => {
          console.log(item);
          setListRecipes(item);
        });
      } else if (radio === 'fl') {
        if (parameter.length === 1) {
          await fetchRecipeByType('f', parameter, 'search', path.slice(1)).then((ite) => {
            console.log(ite);

            setListRecipes(ite);
          });
        } else {
          global.alert('Your search must have only 1 (one) character');
        }
      }
    }

    return { listRecipes,
      setListRecipes,
      categoriesNames,
      numberRecipes,
      path,
      setPath,
      handleClickExec,
    };
  }, [listRecipes, categoriesNames, numberRecipes, path]);

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
