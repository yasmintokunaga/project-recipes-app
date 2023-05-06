import { useContext } from 'react';
import { RecipesContext } from '../context/RecipesProvider';

function ListMealsOrDrinks() {
  const { listRecipes } = useContext(RecipesContext);
  const typeRecipe = window.location.pathname === '/meals' ? 'Meal' : 'Drink';

  return (
    <section>
      { listRecipes && listRecipes.map((recipe, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ recipe[`id${typeRecipe}`]}
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe[`str${typeRecipe}Thumb`] }
              alt={ recipe[`str${typeRecipe}`] }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { recipe[`str${typeRecipe}`] }
            </p>
          </div>
        ))}
    </section>
  );
}
export default ListMealsOrDrinks;
