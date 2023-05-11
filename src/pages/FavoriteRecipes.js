import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import shareBtn from '../images/shareIcon.svg';
import Header from '../components/Header';
import ShareButton from '../components/buttons/shareButton';

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
  // localStorage.setItem('favoriteRecipes', JSON.stringify(xablau));

  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const [copyLink, setCopyLink] = useState(false);
  const [filtredFavoriteRecipes, setfiltredFavoriteRecipes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const teste = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteRecipes(teste);
      console.log(teste);
    }
    // setFavoriteRecipes(xablau);
  }, []);

  console.log(favoriteRecipes);
  const handleClickShareBtn = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopyLink(true);
  };

  const handleClickFilter = (type) => {
    let filtredFavoriteRecipe = [];
    switch (type) {
    case 'drink':
      filtredFavoriteRecipe = doneRecipes.filter((recipe) => recipe.type === 'drink');
      setfiltredFavoriteRecipes(filtredFavoriteRecipe);
      break;
    case 'meal':
      filtredFavoriteRecipe = doneRecipes.filter((recipe) => recipe.type === 'meal');
      setfiltredFavoriteRecipes(filtredFavoriteRecipe);
      break;
    default:
      setfiltredFavoriteRecipes([]);
      break;
    }
  };

  return (
    <div>
      <section>
        <Header title="Favorite Recipes" searchBool={ false } />
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => handleClickFilter('favoriteRecipes') }
        >
          All

        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => handleClickFilter('meal') }
          value="meal"
        >
          Meals

        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClickFilter('drink') }
          value="drink"
        >
          Drinks

        </button>
      </section>
      <section>
        {(filtredFavoriteRecipes.length ? filtredFavoriteRecipes : favoriteRecipes)
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
              {copyLink && <small>Link copied!</small>}
              {/* <div>
                {recipe.tags.map((tagName) => (
                  <p
                    key={ tagName }
                    data-testid={ `${index}-${tagName}-horizontal-tag` }
                  >
                    {tagName}
                  </p>
                ))}
              </div> */}
            </div>
          ))}
      </section>
    </div>
  );
}
