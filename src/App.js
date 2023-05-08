import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Recipes from './pages/Recipes';
import DrinksDetails from './pages/DrinksDetails';
import MealsDetails from './pages/MealsDetails';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path="/meals/:id" component={ MealsDetails } />
      <Route exact path="/drinks/:id" component={ DrinksDetails } />
      <Route exact path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
