import { useContext } from 'react';
import { RecipesContext } from '../context/RecipesProvider';

function Recipes() {
  const { listRecipes } = useContext(RecipesContext);
  const path = window.location.pathname;
  const MAX_NUMBER = 12;
  return (
    <main>
      { listRecipes.filter((_recipe, index) => index < MAX_NUMBER)
        .map((recipe, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ path === '/meals' ? recipe.idMeal : recipe.idDrink }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ path === '/meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
              alt={ path === '/meals' ? recipe.strMeal : recipe.strDrink }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { path === '/meals' ? recipe.strMeal : recipe.strDrink }
            </p>
          </div>
        ))}
    </main>
  );
}
export default Recipes;
