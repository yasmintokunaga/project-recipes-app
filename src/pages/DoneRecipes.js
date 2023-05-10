import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import shareBtn from '../images/shareIcon.svg';
import Header from '../components/Header';
import ShareButton from '../components/buttons/shareButton';

export default function DoneRecipes() {
  // const xablau = [{
  //   id: '01',
  //   type: 'meal',
  //   nationality: 'nacionalidade-da-receita-ou-texto-vazio',
  //   category: 'categoria-da-receita-ou-texto-vazio',
  //   alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
  //   name: 'larissão',
  //   image: 'imagem-da-receita',
  //   doneDate: 'quando-a-receita-foi-concluida',
  //   tags: ['array-de-tags-da-receita-ou-array-vazio'],
  // }, {
  //   id: '02',
  //   type: 'drink',
  //   nationality: 'nacionalidade-da-receita-ou-texto-vazio',
  //   category: 'categoria-da-receita-ou-texto-vazio',
  //   alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
  //   name: 'lalalarys',
  //   image: 'imagem-da-receita',
  //   doneDate: 'quando-a-receita-foi-concluida',
  //   tags: ['array-de-tags-da-receita-ou-array-vazio'],
  // }];

  // const [copyLink, setCopyLink] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const [filtredDoneRecipes, setFiltredDoneRecipes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
    // setDoneRecipes(xablau);
  }, []);

  const handleClickShareBtn = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopyLink(true);
  };

  const handleClickFilter = (type) => {
    let filtredRecipe = [];
    switch (type) {
    case 'drink':
      filtredRecipe = doneRecipes.filter((recipe) => recipe.type === 'drink');
      setFiltredDoneRecipes(filtredRecipe);
      console.log('drink');
      break;
    case 'meal':
      filtredRecipe = doneRecipes.filter((recipe) => recipe.type === 'meal');
      setFiltredDoneRecipes(filtredRecipe);
      console.log('meal');
      break;
    default:
      setFiltredDoneRecipes([]);
      // setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
      console.log('all');
      break;
    }
  };

  return (
    <div>
      <section>

        <Header title="Done Recipes" searchBool={ false } />
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => handleClickFilter('doneRecipes') }
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
        {(filtredDoneRecipes.length ? filtredDoneRecipes : doneRecipes)
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
              <div>
                {recipe.tags.map((tagName) => (
                  <p
                    key={ tagName }
                    data-testid={ `${index}-${tagName}-horizontal-tag` }
                  >
                    {tagName}
                  </p>
                ))}
              </div>
            </div>
          ))}
      </section>

    </div>
  );
}
