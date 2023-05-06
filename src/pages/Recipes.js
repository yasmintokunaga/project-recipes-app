import RecipesMealsOrDrinks from '../components/RecipesMealsOrDrinks';
import ButtonsFilterCategories from '../components/ButtonsFilterCategories';
import Footer from '../components/Footer';

function Recipes() {
  return (
    <main>
      <ButtonsFilterCategories />
      <RecipesMealsOrDrinks />
      <Footer />
    </main>
  );
}
export default Recipes;
