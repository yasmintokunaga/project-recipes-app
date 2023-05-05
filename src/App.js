import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import MainMenu from './pages/MainMenu';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ MainMenu } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
