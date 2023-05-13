import PropTypes from 'prop-types';
import RecipesMealsOrDrinks from '../components/RecipesMealsOrDrinks';
import ButtonsFilterCategories from '../components/ButtonsFilterCategories';
import Footer from '../components/Footer';

function Recipes({ history }) {
  return (
    <main>
      <ButtonsFilterCategories history={ history } />
      <RecipesMealsOrDrinks history={ history } />
      <Footer history={ history } />
    </main>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
export default Recipes;
