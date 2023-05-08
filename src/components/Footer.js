// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import iconMeal from '../images/mealIcon.svg';
import iconDrink from '../images/drinkIcon.svg';
import './Footer.css';
import { RecipesContext } from '../context/RecipesProvider';

function Footer({ history }) {
  const { setPath } = useContext(RecipesContext);
  const handleClick = (link) => {
    setPath(link);
    history.push(link);
  };
  return (
    <section className="footer" data-testid="footer">
      <p>Footer</p>
      <button
        onClick={ () => handleClick('/meals') }
      >
        <img
          src={ iconMeal }
          alt="iconMeal"
          data-testid="meals-bottom-btn"
        />
      </button>
      <button
        onClick={ () => handleClick('/drinks') }
      >
        <img
          src={ iconDrink }
          alt="iconMeal"
          data-testid="drinks-bottom-btn"
        />
      </button>
    </section>
  );
}
Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Footer;
