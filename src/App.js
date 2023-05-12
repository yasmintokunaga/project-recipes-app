import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import DrinksDetails from './pages/DrinksDetails';
import MealsDetails from './pages/MealsDetails';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ RecipeDetails } />
      <Route exact path="/drinks" component={ RecipeDetails } />
      <Route exact path="/meals/:id" component={ MealsDetails } />
      <Route exact path="/drinks/:id" component={ DrinksDetails } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
    </Switch>
  );
}

export default App;
