import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import listOfIngredients from '../services/listOfIngredients';

function MealsInProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

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
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
      />
      <p data-testid="recipe-category">
        {strCategory}
      </p>
      <h3>Ingredientes</h3>
      {ingredients.map(({ ingredient, measure }, index) => (
        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
          />
          <label htmlFor={ ingredient }>
            {` ${measure} - ${ingredient}`}
          </label>
        </label>
      ))}
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
