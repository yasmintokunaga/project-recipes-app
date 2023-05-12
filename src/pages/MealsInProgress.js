import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import listOfIngredients from '../services/listOfIngredients';

import ShareButton from '../components/buttons/shareButton';

function MealsInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  console.log(recipe);
  const [isChecked, setIsChecked] = useState({});
  const [copyLink, setCopyLink] = useState(false);

  const location = window.location.href;
  const share = location.replace(/(\/(?:meals|drinks)\/\d+)\/.*/, '$1');

  const handleClickShareBtn = () => {
    copy(share);
    setCopyLink(true);
  };

  useEffect(() => {
    const saveProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: {},
      meals: {},
    };
    setIsChecked(saveProgressLS.meals[id] || []);
  }, [id]);

  useEffect(() => {
    async function fetchRecipeData() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      const result = data.meals[0];
      setRecipe(result);
      console.log(result);
    }

    fetchRecipeData();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  const onChange = ({ target }) => {
    const { checked } = target;
    const saveProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: {},
      meals: {},
    };

    if (!saveProgressLS.meals[id]) {
      saveProgressLS.meals[id] = [];
    }

    if (checked) {
      saveProgressLS.meals[id].push(target.name);
    } else {
      saveProgressLS.meals[id] = saveProgressLS.meals[id]
        .filter((item) => item !== target.name);
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(saveProgressLS));
    setIsChecked(saveProgressLS.meals[id]);
  };

  const {
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
  } = recipe || {};

  const ingredients = listOfIngredients(recipe);

  return (
    <div>
      <h1 data-testid="recipe-title">
        {strMeal}
      </h1>
      <h4 data-testid="recipe-category">
        {strCategory}
      </h4>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
      />
      <h3>Ingredientes</h3>
      {ingredients.map(({ ingredient, measure }, index) => {
        const isCheckedIngredient = isChecked.includes(ingredient);
        const textDecoration = isCheckedIngredient
          ? 'line-through solid rgb(0, 0, 0)' : '';
        return (
          <label
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            style={ { textDecoration } }
          >
            <input
              type="checkbox"
              name={ ingredient }
              value={ ingredient }
              checked={ isCheckedIngredient }
              onChange={ onChange }
            />
            <label htmlFor={ ingredient }>
              {` ${measure} - ${ingredient}`}
            </label>
          </label>
        );
      }) }
      <h2>Instructions</h2>
      <p data-testid="instructions">
        {strInstructions}
      </p>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
      <ShareButton
        testId="share-btn"
        handleClickShareBtn={ () => handleClickShareBtn() }
      />
      { copyLink && <p>Link copied!</p>}

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isChecked.length !== Object.keys(ingredients).length }
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default MealsInProgress;
