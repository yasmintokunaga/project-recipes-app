import React from 'react';
import shareBtn from '../images/shareIcon.svg';
import Header from '../components/Header';

export default function DoneRecipes() {
  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];

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
              {`${recipe.nationality} - ${recipe.category}`}

            </p>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button data-testid={ `${index}-horizontal-share-btn` }>{shareBtn}</button>
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
