import React from 'react';
import { useHistory } from 'react-router-dom';
import MealsInProgress from './MealsInProgress';
import DrinksInProcess from './DrinksInProcess';

export default function RecipesInProgress() {
  const { location: { pathname } } = useHistory();
  return (
    <div>
      {pathname.includes('/meals')
        ? <MealsInProgress />
        : <DrinksInProcess /> }
    </div>
  );
}
