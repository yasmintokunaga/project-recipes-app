import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import copy from 'clipboard-copy';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import listOfIngredients from '../services/listOfIngredients';
import { fetchRecipesMeals } from '../services/fetchRecipes';
import StartRecipeButton from '../components/buttons/startRecipeButton';
import ShareButton from '../components/buttons/shareButton';
import FavoriteButton from '../components/buttons/favoriteButton';

const MAX_MEALS = 6;

function DrinksDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [mealsRecommendation, setMealsRecommendation] = useState([]);
  const [copyLink, setCopyLink] = useState(false);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  const handleClickShareBtn = () => {
    copy(window.location.href);
    setCopyLink(true);
  };

  useEffect(() => {
    async function fetchRecipeData() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.drinks[0]);
      console.log(data.drinks);
      const meals = await fetchRecipesMeals();
      setMealsRecommendation(meals.slice(0, MAX_MEALS));
      // if (Array.isArray(meals)) {
      // } é preciso essa linha?
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
      <ShareButton
        testId="share-btn"
        handleClickShareBtn={ () => handleClickShareBtn() }
      />
      {copyLink && <small>Link copied!</small>}
      <FavoriteButton recipe={ recipe } />
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
      <Slider { ...settings }>
        {mealsRecommendation.map((meal, index) => (
          <div
            key={ meal.idMeal }
            data-testid={ `${index}-recommendation-card` }
          >
            <h2
              data-testid={ `${index}-recommendation-title` }
            >
              {meal.strMeal}
            </h2>
            <img src={ meal.strMealThumb } alt={ meal.strMeal } />
          </div>
        ))}
      </Slider>
      <StartRecipeButton />
    </div>
  );
}

export default DrinksDetails;
