import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function FavoriteButton({ recipe, type }) {
  const [favorite, setFavorite] = useState(false);

  const iconPath = favorite ? blackHeartIcon : whiteHeartIcon;
  const idPath = window.location.pathname.split('/')[2];
  console.log(idPath);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isAlreadyFavorite = favoriteRecipes
      .some((favRecipe) => favRecipe.id === idPath);
    setFavorite(isAlreadyFavorite);
  }, [idPath]);

  function handleFavoriteClick() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    console.log(favoriteRecipes);
    const isAlreadyFavorite = favoriteRecipes
      .some((favRecipe) => favRecipe.id === idPath);
    console.log(idPath);
    if (isAlreadyFavorite) {
      const newFavoriteRecipes = favoriteRecipes
        .filter((favRecipe) => favRecipe.id !== idPath);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      favoriteRecipes.push({
        id: idPath,
        type,
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }

    setFavorite(!favorite);
  }

  return (
    <div className="div-favorite-btn">
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavoriteClick }
        src={ iconPath }
      >
        <img
          src={ iconPath }
          alt={ favorite ? 'Favoritado' : 'Não favoritado' }
        />
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strArea: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default FavoriteButton;
