import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import listOfIngredients from '../services/listOfIngredients';
import { fetchRecipesDrinks } from '../services/fetchRecipes';
import StartRecipeButton from '../components/buttons/startRecipeButton';
import FavoriteButton from '../components/buttons/favoriteButton';
import ShareButton from '../components/buttons/shareButton';

function MealsDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const drinksRecommendation = fetchRecipesDrinks();

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
    strYoutube,
  } = recipe;

  const ingredients = listOfIngredients(recipe);

  return (
    <div>
      <h1 data-testid="recipe-title">
        {strMeal}
      </h1>
      <ShareButton />
      <FavoriteButton />
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
      />
      <p data-testid="recipe-category">
        Categoria:
        {strCategory}
      </p>
      <h3>Ingredientes</h3>
      <ul>
        {ingredients.map(({ ingredient, measure }, index) => (
          <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
            {` ${measure} - ${ingredient}`}
          </li>
        ))}
      </ul>
      <h3>Modo de Preparo</h3>
      <p data-testid="instructions">
        {strInstructions}
      </p>

      <iframe
        title="video"
        data-testid="video"
        src={ strYoutube }
      />
      <StartRecipeButton />
    </div>
  );
}

export default MealsDetails;
