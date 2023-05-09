import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import listOfIngredients from '../services/listOfIngredients';
import { fetchRecipesMeals } from '../services/fetchRecipes';
import StartRecipeButton from '../components/buttons/startRecipeButton';
import ShareButton from '../components/buttons/shareButton';
import FavoriteButton from '../components/buttons/favoriteButton';

function DrinksDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const mealsRecommendation = fetchRecipesMeals();

  useEffect(() => {
    async function fetchRecipeData() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.drinks[0]);
    }

    fetchRecipeData();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  const {
    strDrink,
    strDrinkThumb,
    strCategory,
    strAlcoholic,
    strInstructions,
    strYoutube,
  } = recipe;

  const ingredients = listOfIngredients(recipe);

  return (
    <div>
      <h1 data-testid="recipe-title">
        {strDrink}
      </h1>
      <ShareButton />
      <FavoriteButton />
      <img
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <p data-testid="recipe-category">
        Categoria:
        {strCategory}
        {strAlcoholic}
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

export default DrinksDetails;
