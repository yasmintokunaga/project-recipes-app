import React, { useEffect, useMemo, useState } from 'react';
import copy from 'clipboard-copy';
import shareBtn from '../images/shareIcon.svg';
import Header from '../components/Header';
import ShareButton from '../components/buttons/shareButton';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  // const xablau = [
  //   {
  //     id: '52771',
  //     type: 'meal',
  //     nationality: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //   },
  //   {
  //     id: '178319',
  //     type: 'drink',
  //     nationality: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'Aquamarine',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //   },
  // ];

  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const [copyLink, setCopyLink] = useState(false);
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
    // setFavoriteRecipes(xablau);
  }, []);

  useMemo(() => ({
    favoriteRecipes,
  }), [favoriteRecipes]);

  const handleFavoriteRemove = (id) => {
    const updatedRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    setFavoriteRecipes([...updatedRecipes]);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
  };

  const handleClickShareBtn = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopyLink(true);
  };

  const handleClickFilter = (type) => {
    let filteredRecipes = [];
    switch (type) {
    case 'meal':
      filteredRecipes = favoriteRecipes.filter((recipe) => recipe.type === 'meal');
      break;
    case 'drink':
      filteredRecipes = favoriteRecipes.filter((recipe) => recipe.type === 'drink');
      break;
    default:
      filteredRecipes = favoriteRecipes;
      break;
    }
    setFilteredFavoriteRecipes(filteredRecipes);
  };

  return (
    <div>
      <section>
        <Header title="Favorite Recipes" searchBool={ false } />
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => handleClickFilter('all') }
        >
          All

        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => handleClickFilter('meal') }
        >
          Meals

        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClickFilter('drink') }
        >
          Drinks

        </button>
      </section>
      <section>
        {(filteredFavoriteRecipes.length > 0 ? filteredFavoriteRecipes : favoriteRecipes)
          .map((recipe, index) => (
            <div key={ recipe.id }>
              <a href={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }>
                <img
                  className="recipe-img"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </a>
              <a href={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              </a>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.nationality} - ${recipe.category} - ${recipe.alcoholicOrNot}`}
              </p>

              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
              <ShareButton
                src={ shareBtn }
                testId={ `${index}-horizontal-share-btn` }
                handleClickShareBtn={ () => handleClickShareBtn(recipe.type, recipe.id) }
              />
              <button
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => handleFavoriteRemove(recipe.id) }
                src={ blackHeartIcon }
              >
                <img
                  src={ blackHeartIcon }
                  alt="Remover"
                />
              </button>

              {copyLink && <small>Link copied!</small>}
            </div>
          ))}
      </section>
    </div>
  );
}
