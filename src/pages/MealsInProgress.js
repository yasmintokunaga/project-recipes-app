import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import listOfIngredients from '../services/listOfIngredients';

function MealsInProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const [isChecked, setIsChecked] = useState({});

  useEffect(() => {
    const saveProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    setIsChecked(saveProgressLS[id] || []);
  }, [id]);

  useEffect(() => {
    async function fetchRecipeData() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.meals[0]);
    }

    fetchRecipeData();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  const onChange = ({ target }) => {
    const { checked } = target;
    const saveProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    saveProgressLS[id] = saveProgressLS[id]
      ? [...saveProgressLS[id], target.name]
      : [target.name];

    if (!checked) {
      saveProgressLS[id] = saveProgressLS[id].filter((el) => el !== target.name);
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(saveProgressLS));
    setIsChecked(saveProgressLS[id]);
  };

  const {
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
  } = recipe;

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
              onChange={ onChange }
              value={ ingredient }
              checked={ isCheckedIngredient }
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

      <button
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>

      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default MealsInProgress;
