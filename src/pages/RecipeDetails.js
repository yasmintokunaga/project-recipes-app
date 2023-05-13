import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import MealsDetails from './MealsDetails';
import DrinksDetails from './DrinksDetails';

function RecipeDetails() {
  const history = useHistory();
  const [type] = useState(history.location.pathname.split('/')[1]);
  console.log('type', type);
  return (
    <main>
      { type === 'meals' && <MealsDetails /> }
      { type === 'drinks' && <DrinksDetails /> }
    </main>
  );
}

export default RecipeDetails;
