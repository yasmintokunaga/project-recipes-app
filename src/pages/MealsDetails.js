import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import listOfIngredients from '../services/listOfIngredients';
import { fetchRecipesDrinks } from '../services/fetchRecipes';
import StartRecipeButton from '../components/buttons/startRecipeButton';
import FavoriteButton from '../components/buttons/favoriteButton';
import ShareButton from '../components/buttons/shareButton';

const MAX_DRINKS = 6;

function MealsDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [drinksRecommendation, setDrinksRecommendation] = useState([]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  useEffect(() => {
    async function fetchRecipeData() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.meals[0]);
      const drinks = await fetchRecipesDrinks();
      if (Array.isArray(drinks)) {
        setDrinksRecommendation(drinks.slice(0, MAX_DRINKS));
      }
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
      <ShareButton testId="share-btn" />
      <FavoriteButton recipe={ recipe } type="meal" />
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
      <Slider { ...settings }>
        {drinksRecommendation.map((drink, index) => (
          <div
            data-testid={ `${index}-recommendation-card` }
            key={ drink.idDrink }
          >
            <h2
              data-testid={ `${index}-recommendation-title` }
            >
              {drink.strDrink}
            </h2>
            <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
          </div>
        ))}
      </Slider>
      <Link to={ `/meals/${id}/in-progress` }>
        <StartRecipeButton />
      </Link>
    </div>
  );
}

export default MealsDetails;
