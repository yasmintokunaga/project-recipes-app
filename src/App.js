import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Recipes from './pages/Recipes';
import DrinksDetails from './pages/DrinksDetails';
import MealsDetails from './pages/MealsDetails';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipesInProgress from './pages/RecipesInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path="/meals/:id" component={ MealsDetails } />
      <Route exact path="/drinks/:id" component={ DrinksDetails } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/meals/:id/in-progress" component={ RecipesInProgress } />
      <Route exact path="/drink/:id/in-progress" component={ RecipesInProgress } />
    </Switch>
  );
}

export default App;
