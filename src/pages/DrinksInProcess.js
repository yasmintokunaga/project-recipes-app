import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import listOfIngredients from '../services/listOfIngredients';
import ShareButton from '../components/buttons/shareButton';

function MealsInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState(null);
  const [isChecked, setIsChecked] = useState({});

  const [copyLink, setCopyLink] = useState(false);

  const location = window.location.href;
  const share = location.replace(/(\/(?:meals|drinks)\/\d+)\/.*/, '$1');

  const handleClickShareBtn = () => {
    copy(share);
    setCopyLink(true);
  };

  useEffect(() => {
    async function fetchRecipeData() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.drinks[0]);
    }

    fetchRecipeData();
  }, [id]);

  useEffect(() => {
    const saveProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    setIsChecked(saveProgressLS[id] || []);
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
    strDrink,
    strDrinkThumb,
    strCategory,
    strAlcoholic,
    strInstructions,
  } = recipe;

  const ingredients = listOfIngredients(recipe);

  return (
    <div>
      <h1 data-testid="recipe-title">
        {strDrink}
      </h1>
      <h4 data-testid="recipe-category">
        {strCategory}
        { ' '}
        {strAlcoholic}
      </h4>
      <img
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
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

      <ShareButton
        testId="share-btn"
        handleClickShareBtn={ () => handleClickShareBtn() }
      />
      { copyLink && <p>Link copied!</p>}

      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default MealsInProgress;
