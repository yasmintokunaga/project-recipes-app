import React from 'react';
import { useHistory } from 'react-router-dom';
import MealInProgress from './MealInProgress';
import DrinkInProcess from './DrinkInProcess';

export default function RecipesInProgress() {
  const { location: { pathname } } = useHistory();
  return (
    <div>
      {pathname.includes('/meals')
        ? <MealInProgress />
        : <DrinkInProcess /> }
    </div>
  );
}
