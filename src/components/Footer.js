import { Link } from 'react-router-dom';
import iconMeal from '../images/mealIcon.svg';
import iconDrink from '../images/drinkIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <section className="footer" data-testid="footer">
      <p>Footer</p>
      <Link
        to="/meals"
      >
        <img
          src={ iconMeal }
          alt="iconMeal"
          data-testid="meals-bottom-btn"
        />
      </Link>
      <Link
        to="/drinks"
      >
        <img
          src={ iconDrink }
          alt="iconMeal"
          data-testid="drinks-bottom-btn"
        />
      </Link>
    </section>
  );
}
export default Footer;
