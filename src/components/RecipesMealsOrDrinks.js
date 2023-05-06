import { useContext } from 'react';
import { RecipesContext } from '../context/RecipesProvider';
import { Link } from 'react-router-dom';

function ListMealsOrDrinks() {
  const { listRecipes } = useContext(RecipesContext);
  const path = window.location.pathname;
  const typeRecipe = path === '/meals' ? 'Meal' : 'Drink';

  return (
    <section>
      { listRecipes && listRecipes.map((recipe, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ recipe[`id${typeRecipe}`]}
          >
            <Link to={ `${path}/${recipe[`id${typeRecipe}`]}` }>
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
            </Link>
          </div>
        ))}
    </section>
  );
}
export default ListMealsOrDrinks;
