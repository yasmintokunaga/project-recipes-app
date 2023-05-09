import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareBtn from '../images/shareIcon.svg';
import Header from '../components/Header';

export default function DoneRecipes() {
  const xablau = [{
    id: 'id-da-receita',
    type: 'meal-ou-drink',
    nationality: 'nacionalidade-da-receita-ou-texto-vazio',
    category: 'categoria-da-receita-ou-texto-vazio',
    alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
    name: 'nome-da-receita',
    image: 'imagem-da-receita',
    doneDate: 'quando-a-receita-foi-concluida',
    tags: ['array-de-tags-da-receita-ou-array-vazio'],
  }];

  const [copyLink, setCopyLink] = useState(false);

  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes')) : xablau;

  // const history = useHistory();

  const handleClickShareBtn = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopyLink(true);
  };

  return (
    <div>
      <section>

        <Header title="Done Recipes" searchBool={ false } />
        <button
          data-testid="filter-by-all-btn"
        >
          All

        </button>
        <button
          data-testid="filter-by-meal-btn"
        >
          Meals

        </button>
        <button
          data-testid="filter-by-drink-btn"
        >
          Drinks

        </button>
      </section>
      <section>
        {doneRecipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />

            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category} - ${recipe.alcoholicOrNot}`}

            </p>

            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareBtn }
              onClick={ () => handleClickShareBtn(recipe.type, recipe.id) }
            >
              <img
                src={ shareBtn }
                alt="icon"
              />

            </button>
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
